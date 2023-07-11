const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');
const cors = require('./cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {sendMail} = require('../utils/mailer')


const router = express.Router();

/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
    User.find({})
    .then(users => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    })
    .catch(err => next(err));
});

router.post('/signup', cors.corsWithOptions, (req, res) => {
    const {email, username, password} = req.body;
    bcrypt.hash(password, 10).then(function(hash) {
        // Store hash in your password DB.
        if(hash) {
            User.create( {
                email,
                username,
                password: hash
            })
            .then( (response) => {
                sendMail(email, 'verify email', 'please confirm in email', `
                <h3>UserName: ${username}</h3>
                <p>Confirm Email with link</p>
                <a href='http://192.168.4.23:3000'>Click Here</a>
                ` )
                res.json({user: 'user saved'})
            })
        } else {
            res.status(400).json({error: 'Erros has occured'})
        }
    });
    // User.register(
    //     new User({username: req.body.username}),
    //     req.body.password,
    //     (err, user) => {
    //         if (err) {
    //             res.statusCode = 500;
    //             res.setHeader('Content-Type', 'application/json');
    //             res.json({err: err});
    //         } else {
    //             if (req.body.firstname) {
    //                 user.firstname = req.body.firstname;
    //             }
    //             if (req.body.lastname) {
    //                 user.lastname = req.body.lastname;
    //             }
    //             user.save(err => {
    //                 if (err) {
    //                     res.statusCode = 500;
    //                     res.setHeader('Content-Type', 'application/json');
    //                     res.json({err: err});
    //                     return;
    //                 }
    //                 passport.authenticate('local')(req, res, () => {
    //                     res.statusCode = 200;
    //                     res.setHeader('Content-Type', 'application/json');
    //                     res.json({success: true, status: 'Registration Successful!'});
    //                 });
    //             });
    //         }
    //     }
    // );
});

router.post('/login', cors.corsWithOptions, (req, res) => {
    // const token = authenticate.getToken({_id: req.user._id});
    const {username, password} = req.body
    User.findOne({username: username})
    .then( (user) => {
        console.log(user)
        if(user) {
            bcrypt.compare(password, user.password)
            .then(function (result) {
                // result == true
                if(result){
                    let token = jwt.sign({ id: user._id }, process.env.JSON_SECRET);
                    res.json({jwt: token})
                }
            })
               } else {
            res.json({err: 'Error occured'})
        }
    })
    .catch((err) => {
        res.send(err)
    })
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.get('/logout', cors.corsWithOptions, (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        const err = new Error('You are not logged in!');
        err.status = 401;
        return next(err);
    }
});

module.exports = router;