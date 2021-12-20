const mongoose = require("mongoose");
const User = require("../models/user");
const Employee = require("../models/employee");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { token } = require("morgan");

module.exports.login = function (req, res, next) {
    Employee.find({email: req.body.email})
    .exec()
    .then(employee => {
        if(employee.length < 1){
            return res.status(401).json({
                message: 'Authentication Failed'
            });
        }
        bcrypt.compare(req.body.password, employee[0].password, (err, result)=> {
            if (err){
                return res.status(401).json({
                    message: 'Authentication Failed'
                });
            }
            if( result ) {
                const token = jwt.sign({
                    email: employee[0].email,
                    employeeId: employee[0]._id
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

module.exports.createSubaccount = function (req, res, next){

    Employee.find({email: req.body.email})
    .exec()
    .then(employee => {
        if (employee.length >= 1){
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
                    const employee = new Employee({
                        _id : new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        role: req.body.role,
                        password: hash,
                        creator: token.arguments._id
                    });
                    employee
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

module.exports.viewSubaccounts = function (req, res, next){

    Employee.find({creator: token.arguments._id})
    .exec()
    .then(employees=>{
        if(employees.length < 1){
            return res.status(400).json({
                message: 'No Employees yet!'
            });
        } else {
            return res.status(200).json(employees);
        }   
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

module.exports.deleteSubaccount = function (req, res, next){

    Employee.remove({_id: req.params.id, creator: token.arguments._id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Sub-account Deleted"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}