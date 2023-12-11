var express = require('express');
var router = express.Router();
const passport = require('passport');
let DB = require('../config/db');
let indexController = require('../controllers/index')
let userModel = require('../models/user');
let User = userModel.User;


/* GET home page. */
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);


// Get & Post Login Page
router.get('/login', indexController.displayLoginPage)
router.post('/login', indexController.processLoginPage)


// Get & Post Register Page
router.get('/register', indexController.displayRegisterPage)
router.post('/register', indexController.processRegisterPage)


// Get & Post Login Page
router.get('/login', indexController.performLogout)

module.exports = router;