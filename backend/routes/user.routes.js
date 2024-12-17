const express = require('express')
const router = express.Router();
// we are using a express validator to validate that incomming data is correct or not
const {body} = require('express-validator')
const userController = require('../controllers/user.controllers')

//register user 
router.post('/register',[
    // passing this callbacks to express-validator to validate
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name should be at least 3 character long'),
    body('password').isLength({min:6}).withMessage('password must be 6 character in length')
],userController.registerUser)


// login user
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be 6 character in length')
],userController.loginUser)

























module.exports = router;
