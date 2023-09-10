const jwt = require("jsonwebtoken");
const axios = require("axios");
const { sha512 } = require("js-sha512");

const AdminModel = require("./../../../Models/AdminModel");
const { generateOtp } = require("../../Utils/common");
const { sendOtpMail, sendAcceptMail, sendRejectMail } = require("../../Utils/sendMail");
const VolunteerModel = require("../../../Models/VolunteerModel");
const NGOModel = require("../../../Models/NGOModel");

const loginAction = async (req, res) => {
  const { googleAccessToken } = req.body;

  axios
    .get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    })
    .then(async (response) => {
      const emailId = response.data.email;
      let findUser = await AdminModel.findOne({ emailId });
      if (!findUser) {
        res.status(400).json({ message: "Admin Doesn't exist!" });
      }
      const role = "admin";
      const token = jwt.sign(
        {
          email: findUser.emailId,
          id: findUser._id,
          role: role,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({ user: findUser, token });
    })
    .catch((err) => {
      res.status(400).json({ message: "Invalid access token!" });
    });
};

const loginAuthEmail = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminData = await AdminModel.findOne({
      emailId: email,
      password: sha512(password + process.env.SHA_SECRET),
    });
    const role = "admin";

    if (adminData) {
      const token = jwt.sign(
        {
          email: adminData.emailId,
          id: adminData._id,
          role: role,
        },
        process.env.JWT_SECRET
      );

      res.json({ StatusCode:200, user: adminData, token });
    } else {
      res.send({ StatusCode:400, msg: "Email or Password Incorrect" });
    }
  } catch (err) {
    res.send({ StatusCode:500, msg: "Server not found" });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  let userDetails = await AdminModel.findOne({ emailId: email });
  console.log(userDetails);
  if (userDetails) {
    // check otp
    if (otp === userDetails.otp) {
      AdminModel.updateOne({ emailId: email }, { $unset: { otp: "" } }).then(
        (resu) => {
          res.status(200).send({ msg: "Success", userData: userDetails });
        }
      );
    } else {
      res.status(400).send({ msg: "Invalid otp" });
    }
  } else {
    res.status(400).send({ msg: "Email id incorrect" });
  }
};

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const otp = generateOtp(6);

  const user = {
    displayName: name,
    emailId: email,
    password: sha512(password + process.env.SHA_SECRET),
    otp: otp,
  };

  console.log(user);

  let findUser = await AdminModel.findOne({ emailId: email });
  if (findUser) {
    res.status(400).send({ msg: "This email is already registered" });
  } else {
    const userToSave = new AdminModel(user);

    console.log(userToSave);
    await userToSave
      .save()
      .then((result) => {
        console.log(result);
        sendOtpMail(email, otp);
        res.status(200).send({ msg: "Success" });
      })
      .catch((err) => {
        res.status(500).send({ msg: "mongo error" });
      });
  }
};

const fetchVoluteer = async (req, res) => {
  try {
    const vol = await VolunteerModel.find();
    res.status(200).send({ volList: vol });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const fetchNGO = async (req, res) => {
  try {
    const ngo = await NGOModel.find();
    res.status(200).send({ ngoList: ngo });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const acceptRejectUser = async (req, res) => {
  try {
    const { user, status, comment, role } = req.body;

    if (role === "ngo") {
      const ngoData = await NGOModel.findById(user._id);
      if (ngoData) {
        if (status === 1) {
          await NGOModel.updateOne({ _id: user._id }, { isValidated: status, comment: "" });
          sendAcceptMail(user.emailId, role)
          res.status(200).send({ msg: "Status updated" });
        } else if (status === 2) {
          await NGOModel.updateOne(
            { _id: user._id },
            { isValidated: status, comment }
          );
          sendRejectMail(user.emailId, role, comment);
          res.status(200).send({ msg: "Status updated" });
        } else {
          res.status(400).send({ msg: "Error" });
        }
      } else {
        res.status(400).send({ msg: "Error" });
      }
    } else if (role === "vol") {
      const volData = await VolunteerModel.findById(user._id);
      if (volData) {
        if (status === 1) {
          await VolunteerModel.updateOne({ _id: user._id }, { isValidated: status, comment: "" });
          sendAcceptMail(user.emailId, role);
          res.status(200).send({ msg: "Status updated" });
        } else if (status === 2) {
          await VolunteerModel.updateOne(
            { _id: user._id },
            { isValidated: status, comment }
          );
          sendRejectMail(user.emailId, role, comment);
          res.status(200).send({ msg: "Status updated" });
        } else {
          res.status(400).send({ msg: "Error" });
        }
      } else {
        res.status(400).send({ msg: "Error" });
      }
    } else {
      res.status(400).send({ msg: "Error" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const removeUser = async(req, res) => {
    const {user, role} = req.body;
    try{
        if(role === 'vol'){
            await VolunteerModel.deleteOne({_id: user._id})
            res.status(200).send({msg: "Success"})
        }    
        else if(role === 'ngo'){
            await NGOModel.deleteOne({_id: user._id})
            res.status(200).send({msg: "Success"})
        }
        else{
            res.status(400).send({ msg: "Error" });
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
}


module.exports = {
  loginAction,
  loginAuthEmail,
  fetchVoluteer,
  fetchNGO,
  acceptRejectUser,
  removeUser
};
