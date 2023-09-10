const express=require("express")
const { resetPassword, verifyResetOtp } = require("../common")
const router=express.Router()

router.post('/resetpassword', resetPassword);
router.post('/verifyresetotp', verifyResetOtp);

module.exports = router;