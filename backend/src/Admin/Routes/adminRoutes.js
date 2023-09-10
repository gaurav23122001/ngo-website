const express=require("express")
const { loginAction, loginAuthEmail, fetchVoluteer, fetchNGO, acceptRejectUser, removeUser } = require("../Controller/adminService")
const router=express.Router()
const validate  = require('../validate.js');

router.get('/check',(req,res)=>{
    res.send("Server is running")
})

router.post('/login',loginAction)
router.post('/loginemail', loginAuthEmail)
router.post('/fetchvol',validate,fetchVoluteer)
router.post('/fetchngo',validate,fetchNGO)
router.post('/acceptrejectuser', validate, acceptRejectUser)
router.post('/removeuser', validate, removeUser)


module.exports = router;