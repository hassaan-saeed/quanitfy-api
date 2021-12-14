const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.signup = function (req, res, next){

    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1){
            return res.status(409).json({
                message: "User already exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error : err
                    });
                } else {
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        business: req.body.business,
                        password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "User Created"
                        });
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    }) 
}

module.exports.login = function (req, res, next) {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'Authentication Failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=> {
            if (err){
                return res.status(401).json({
                    message: 'Authentication Failed'
                });
            }
            if( result ) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: 'Authentication success',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Authentication Failed'
            });
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

module.exports.delete = function (req, res, next) {
    User.remove({_id: req.params.id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User Deleted"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}