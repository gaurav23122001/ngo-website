const jwt = require("jsonwebtoken")
const axios = require("axios")
const sha512 = require('js-sha512');

const NGOModel=require('../../../Models/NGOModel');
const ProjectModel = require('../../../Models/ProjectModel');

const { generateOtp } = require("../../Utils/common");
const { sendOtpMail, sendUpdateMail } = require("../../Utils/sendMail");
const StatusModel = require("../../../Models/StatusModel");
const VolunteerModel = require("../../../Models/VolunteerModel");

const loginAction = async (req, res) => {
    const {googleAccessToken} = req.body;

    axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${googleAccessToken}`
        }
    })
        .then(async response => {
            const firstName = response.data.given_name;
            const name = response.data.name;
            const emailId = response.data.email;
            const picture = response.data.picture;
            const sub = response.data.sub;

            let findUser = await NGOModel.findOne({emailId})
            if (!findUser) {
                try{
                    const newUser = {
                        googleId: sub,
                        displayName: name,
                        firstName: firstName,
                        image: picture,
                        emailId,
                    }

                    findUser = new NGOModel(newUser);
                    await findUser.save();

                }catch (err){
                    res.json({StatusCode:500, err});
                }
            }
            const role="ngo"
            const token = jwt.sign({
                email: findUser.emailId,
                id: findUser._id,
                role:role
            }, process.env.JWT_SECRET);

            res.json({StatusCode:200, user: findUser, token})
                
        })
        .catch(err => {
            res
                .json({StatusCode:400, message: "Invalid access token!"})
        })

}

const loginAuthEmail = async (req, res) => {
    const { email, password } = req.body;
    
      try {
        const ngoData = await NGOModel.findOne({
          emailId: email,
          password: sha512(password + process.env.SHA_SECRET),
        });
        const role = "ngo";
  
        if (ngoData && !ngoData.otp) {
          const token = jwt.sign(
            {
              email: ngoData.emailId,
              id: ngoData._id,
              role: role,
            },
            process.env.JWT_SECRET
          );
          await NGOModel.updateOne({emailId: email}, 
            { $unset: { resetotp: ""} }
          )
          res.json({StatusCode:200, user: ngoData, token });
        } else {
          res.send({StatusCode: 400, msg: "Email or Password Incorrect" });
        }
      } catch (err) {
        res.send({StatusCode:500, msg: "Server not found", "err": err });
      }
  };

const verifyOtp = async(req, res) => {
    const { email, otp } = req.body;
    
    let userDetails = await NGOModel.findOne({ emailId: email });
    console.log(userDetails);
    if(userDetails){
        // check otp
        if(otp === userDetails.otp){
            NGOModel.updateOne({emailId: email}, 
                { $unset: { otp: ""} }
            ).then((resu) => {
                res.send({StatusCode: 200, msg: "Success", userData: userDetails});
            });
        }
        else{
            res.send({StatusCode: 400, msg: "Invalid otp"});
        }
    }
    else{
      res.send({StatusCode: 400,msg: "Email id incorrect"});
    }
}

const registerNgo = async (req, res) => {
  const { name, email, password } = req.body;
  const otp = generateOtp(6);

  const user = {
    NGOName: name,
    emailId: email,
    password: sha512(password + process.env.SHA_SECRET),
    otp: otp,
  };

  console.log(user);

  let findUser = await NGOModel.findOne({ emailId: email });
  if (findUser) {
    res.send({StatusCode: 400, msg: "This email is already registered"})
  }

  else{
  const userToSave = new NGOModel(user);

  console.log(userToSave);
  await userToSave.save().then((result) => {
      console.log(result);
      sendOtpMail(email, otp);
      res.send({StatusCode: 200, msg: "Success"});
    })
    .catch((err) => {
      res.send({ StatusCode: 500, msg: "mongo error", err: err });
    });
}
};

const updateNgo=async(req,res)=>{
  const user=req.user
  const details=req.body
  console.log(user, details)
  try{
  await NGOModel.updateOne({emailId: user.emailId}, details)
  sendUpdateMail(user.emailId)
  res.status(200).send({msg:"Profile Updated Successfully"})
  }catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const getNgoDetails = async(req, res) => {
  const user=req.user
  res.status(200).send({userDetails:user})
}

const reApply=async(req,res)=>{
  const user=req.user
  try{
  await NGOModel.updateOne({emailId:user.emailId},{isValidated:0})
  res.status(200).send({msg:"Applied Successfully"})
  }catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const addProject = async(req, res) => {
  const user = req.user;
  let project = req.body;
  try{
    if(user.isValidated === 1){
      project.NGO=req.user
    const proj = new ProjectModel(project);
    await proj.save()
    req.user.projects.push(proj);

    await req.user.save();
    res.status(200).send({msg:"Project added"})
    }
    else{
      res.status(400).send({msg: "NGO not validated"})
    }
  }
  catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const updateProject = async(req, res) => {
  const user = req.user;
  const {project} = req.body;

  try{
    console.log(user, project)

    // console.log(projData)
    await ProjectModel.updateOne({ _id: project._id }, project)
  
    // await ProjectModel.deleteOne({_id: req.body.project._id});
    res.status(200).send({msg:"Project updated"})
  }
  catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const deleteProject = async(req, res) => {
  const user = req.user;
  const {project} = req.body;

  try{
    console.log(user, project)

    // console.log(projData)
    await NGOModel.updateOne({ emailId: req.user.emailId },
      { $pull: { 'projects': project._id }})

    await ProjectModel.updateOne({_id:project._id},{isDeleted:1})
  
    
    // await ProjectModel.deleteOne({_id: req.body.project._id});
    res.status(200).send({msg:"Project deleted"})
  }
  catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
  
}

const fetchProjectDetails = async(req, res) => {
  const user=req.user
  try{
    const projectList = await NGOModel.findOne({emailId:user.emailId}).populate('projects')

  res.status(200).send({projectList: projectList});
  }
  catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const fetchVolunteers = async(req, res) => {
  const user=req.user
  const {project} = req.body;
  try{
  console.log(project, user)
  const volData=await ProjectModel.findOne({_id:project._id}).populate({path: 'projectstat', populate:{path: 'volunteer', model: 'Volunteer'}})
  res.status(200).send({volData:volData})
  }
  catch(err){
    res.status(500).send({msg:"Internal Server Error"})
  }
}

const acceptRejectVol=async(req,res)=>{ //test again
  const user=req.user
  const {status,project,volunteer, remarks}=req.body
try{
  const projectData=await ProjectModel.findById(project._id)
  const volData=await VolunteerModel.findById(volunteer._id)
  if(status === 1 ){
    if(project.remainingOpen>0){
    await StatusModel.updateOne({
      volunteer:volData,
      project:projectData
    },{status})
    const remainingOpen=project.remainingOpen-1
    await ProjectModel.updateOne({_id:project._id},{remainingOpen})
    res.status(200).send({msg:"Status Updated"})
  }
  else{
    res.status(400).send({msg:"No more openings left"})
  }
  }
  else if(status === 2){
    await StatusModel.updateOne({
      volunteer:volData,
      project:projectData
    },{status, remarks})
    res.status(200).send({msg:"Status Updated"})
  }
  else{
    res.status(400).send({msg:"Error"})
  }
  
}catch(err){
  res.status(500).send({msg:"Internal Server Error"})
}
}

module.exports={
    loginAction,
    registerNgo,
    verifyOtp,
    loginAuthEmail,
    updateNgo,
    getNgoDetails,
    reApply,
    addProject,
    deleteProject,
    updateProject,
    fetchProjectDetails,
    fetchVolunteers,
    acceptRejectVol
}