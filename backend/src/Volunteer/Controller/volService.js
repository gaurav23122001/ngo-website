const jwt = require("jsonwebtoken");
const axios = require("axios");

const VolModel = require("../../../Models/VolunteerModel");
const { generateOtp } = require("../../Utils/common");
const { sendOtpMail, sendUpdateMail } = require("../../Utils/sendMail");

const sha512 = require('js-sha512');
const StatusModel = require("../../../Models/StatusModel");
const ProjectModel = require("../../../Models/ProjectModel");

const loginAction = async (req, res) => {
  const { googleAccessToken } = req.body;

  axios
    .get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    })
    .then(async (response) => {
      const firstName = response.data.given_name;
      const name = response.data.name;
      const emailId = response.data.email;
      const picture = response.data.picture;
      const sub = response.data.sub;

      let findUser = await VolModel.findOne({ emailId });
      if (!findUser) {
        try {
          const newUser = {
            googleId: sub,
            displayName: name,
            firstName: firstName,
            image: picture,
            emailId,
          };

          findUser = new VolModel(newUser);
          await findUser.save();
        } catch (err) {
          res.json({StatusCode:500,err});
        }
      }
      const role = "vol";
      const token = jwt.sign(
        {
          email: findUser.emailId,
          id: findUser._id,
          role: role,
        },
        process.env.JWT_SECRET
      );

      res.json({StatusCode:200, user: findUser, token });
    })
    .catch((err) => {
      res.json({StatusCode:400, message: "Invalid access token!" });
    });
};

const loginAuthEmail = async (req, res) => {
  const { email, password } = req.body;
  
    try {
      const volData = await VolModel.findOne({
        emailId: email,
        password: sha512(password + process.env.SHA_SECRET),
      });
      const role = "vol";

      if (volData && !volData.otp) {
        const token = jwt.sign(
          {
            email: volData.emailId,
            id: volData._id,
            role: role,
          },
          process.env.JWT_SECRET
        );
        await VolModel.updateOne({emailId: email}, 
          { $unset: { resetotp: ""} }
        )
        res.json({StatusCode:200, user: volData, token });
      } else {
        res.send({StatusCode:400, msg: "Email or Password Incorrect" });
      }
    } catch (err) {
      res.send({StatusCode:500, msg: "Server not found", "err": err });
    }
  
};



const verifyOtp = async(req, res) => {
    const { email, otp } = req.body;
    
    let userDetails = await VolModel.findOne({ emailId: email });
    console.log(userDetails);
    if(userDetails){
        // check otp
        if(otp === userDetails.otp){
            VolModel.updateOne({emailId: email}, 
                { $unset: { otp: ""} }
            ).then((resu) => {
                res.send({StatusCode:200,msg: "Success", userData: userDetails});
            });
        }
        else{
            res.send({StatusCode:400,msg: "Invalid otp"});
        }
    }
    else{
        res.send({StatusCode:400,msg: "Email id incorrect"});
    }
}

const registerVolunteer = async (req, res) => {
  const { name, email, password } = req.body;
  const otp = generateOtp(6);

  const user = {
    displayName: name,
    emailId: email,
    password: sha512(password + process.env.SHA_SECRET),
    otp: otp,
  };

  console.log(user);

  let findUser = await VolModel.findOne({ emailId: email });
  if (findUser && !findUser.otp) {
    res.send({StatusCode:400,msg: "This email is already registered"})
  }
  else if(findUser){
    await VolModel.updateOne({emailId:email},{otp,displayName:name})
    sendOtpMail(email, otp);
    res.send({StatusCode:200,msg: "Success"});
  }

  else{
  const userToSave = new VolModel(user);

  console.log(userToSave);
  await userToSave
    .save()
    .then((result) => {
      console.log(result);
      sendOtpMail(email, otp);
      res.send({StatusCode:200,msg: "Success"});
    })
    .catch((err) => {
      res.send({StatusCode:500, msg: "mongo error" });
    });
}
};

const updateVol=async(req,res)=>{
  const user=req.user
  const details=req.body
  console.log(user, details)
  try{
  await VolModel.updateOne({emailId: user.emailId}, details)
  sendUpdateMail(user.emailId)
  res.status(200).send({msg:"Profile Updated Successfully"})
  }catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const getVolDetails = async(req, res) => {
  const user=req.user
  res.status(200).send({userDetails:user})
}

const reApply=async(req,res)=>{
  const user=req.user
  try{
  await VolModel.updateOne({emailId:user.emailId},{isValidated:0})
  res.status(200).send({msg:"Applied Successfully"})
  }catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const applyProject=async(req,res)=>{
  const user=req.user
  const {project}=req.body
  const status={
    volunteer:user,
    project:project
  }
  try{
  if(project.remainingOpen>0){
  const statusData=new StatusModel(status)
  await statusData.save()

  req.user.statusP.push(statusData)
  await req.user.save()

  const projectData=await ProjectModel.findById(project._id)
  projectData.projectstat.push(statusData)
  await projectData.save()
  res.status(200).send({msg: "Success"});
  }
  else{
    res.status(400).send({msg:"No more openings"})
  }
  }
  catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const fetchUserProjects = async(req, res) => {
  const user=req.user
  try{
    const appliedList = await VolModel.findOne({emailId:user.emailId}).populate({path: 'statusP', populate:{path: 'project', model: 'Project'}})

  res.status(200).send({appliedList: appliedList.statusP});
  }
  catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const fetchProjects=async(req,res)=>{
  const user = req.user;
  
  try{
    if(user.isValidated === 1){
      const proj=await ProjectModel.find({isDeleted:0}).populate('NGO')
      res.status(200).send({projList:proj});
    }
    else{
      res.status(400).send({msg:"Volunteer not validated"})
    }
  }
  catch(err){
      res.status(500).send({msg:"Internal Server Error"})
  }

}

const giveRating=async(req,res)=>{
  try{
  const {volunteer,rated}=req.body;
  const rating=(((volunteer.peopleRated*volunteer.rating)+rated)/(volunteer.peopleRated+1))
  await VolModel.updateOne({_id:volunteer._id},{rating})
  res.status(200).send({msg:"Rating Provided"})
  }catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

module.exports = {
  loginAction,
  loginAuthEmail,
  registerVolunteer,
  verifyOtp,
  updateVol,
  getVolDetails,
  reApply,
  applyProject,
  fetchUserProjects,
  fetchProjects,
  giveRating
};
