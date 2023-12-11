let express = require('express');
// const { passport } = require('fontawesome');
const passport = require('passport');
const { register } = require('../models/Bio_books');
let router = express.Router;

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next)=>{
    res.render('index', {title: 'Home'});
}

// Display the Login Page
module.exports.displayLoginPage = (req, res, next)=>{
    if (!req.user)
        {
            res.render('auth/login',{
                title: 'Login',
                message: req.flash('loginMessage'),
                displayName: req.user ? req.user.displayName: ''
            })
        }
    else
        {
            return res.redirect('/')
        }
}
// Processing the Login Page
module.exports.processLoginPage = (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{
        // Server error
        if (err)
            {
                return next(err)
            }

        // If there Login error
        if (!user)
            {
                req.flash('loginMessage',
                'AuthenticationError');
                return res.redirect('/login')
            }
            req.login(user, (err)=>{
                if (err)
                    {
                        return next(err)
                    }
                return res.redirect('/shopping-list');
        })
    }) (req, res, next)
}


// Display the Registration Page
module.exports.displayRegisterPage = (req, res, next)=>{
    // Check if user is not already logged in
    if (!req.user)
        {
            res.render('auth/register',{
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
            })
        }
    else
        {
            return res.redirect('/')
        }
}
// Processing the Registration Page
module.exports.processRegisterPage = (req, res, next)=>{
    let newUser = new User(
        {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
        })

    User.register(newUser, req.body.password, (err)=>{
        if (err)
            {
                console.log("Error: Inserting the new user");
                if (err.name == "UserExistsError")
                    {
                        req.flash('registerMessage',
                        'Registration Error: User Already Exists');
                    }

                return res.render('auth/register',
                    {
                    title: 'Register',
                    message: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName: ''
                    });
            }
        else
            {
                // If registration is not successful
                return passport.authenticate('local')(req,res,()=>{
                        res.redirect('/shopping-list');
                    })
            }
    })
}


// Perform Logout
module.exports.performLogout = (req, res, next)=>{
    res.logout(function(err){
        if (err){
            return next(err);
        }
    });
    res.redirect('/');
}