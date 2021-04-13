const express = require("express")
const {salam, signup, singin, signout} = require('../controllers/authController')
const {userSignupValidator} = require('../middlewares/userValidator')
const {requireSignIn} = require("../middlewares/auth")


const router = express.Router()

router.get("/",salam)
router.post("/singup", userSignupValidator, signup)
router.post("/singin", singin)
router.get("/singout", signout)


router.get("/hello", requireSignIn, (req, res) => {
    res.send("hello there")
})

module.exports = router