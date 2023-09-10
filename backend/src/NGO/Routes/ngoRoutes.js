const express=require("express")
const { loginAction, loginAuthEmail, registerNgo, verifyOtp, reApply, updateNgo, getNgoDetails, addProject, deleteProject, updateProject, fetchProjectDetails, fetchVolunteers, acceptRejectVol } = require("../Controller/ngoService")
const validate  = require('../validate.js');
const router=express.Router()

router.get('/check',(req,res)=>{
    res.send("Server is running")
})

router.post('/login',loginAction)
router.post('/loginemail', loginAuthEmail)
router.post('/register', registerNgo)
router.post('/addngo', verifyOtp)
router.post('/update', validate, updateNgo)
router.post('/profile', validate, getNgoDetails)
router.post('/reapply', validate, reApply)
router.post('/addproject', validate, addProject)
router.post('/deleteproject', validate, deleteProject)
router.post('/updateproject', validate, updateProject)
router.post('/fetchproject', validate, fetchProjectDetails)
router.post('/fetchvolunteer', validate, fetchVolunteers)
router.post('/acceptvol', validate, acceptRejectVol)

module.exports = router;