const express=require("express")
const { loginAction, registerVolunteer, verifyOtp, loginAuthEmail, updateVol, getVolDetails, reApply, applyProject, fetchUserProjects, fetchProjects, giveRating } = require("../Controller/volService")
const validate = require("../validate");
const router=express.Router()

router.get('/check',(req,res)=>{
    res.send("Server is running")
})

router.post('/login',loginAction)
//change

router.post('/loginemail', loginAuthEmail)
router.post('/register', registerVolunteer)
router.post('/addvolunteer', verifyOtp)
router.post('/update', validate, updateVol)
router.post('/profile', validate, getVolDetails)
router.post('/reapply', validate, reApply)
router.post('/applyproj', validate, applyProject)
router.post('/fetchuserproj', validate, fetchUserProjects)
router.post('/fetchprojects', validate, fetchProjects)
router.post('/giverating',validate,giveRating)

module.exports = router;