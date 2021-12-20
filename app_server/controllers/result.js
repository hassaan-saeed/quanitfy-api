const mongoose = require("mongoose");
const Result = require("../models/result");
const Image = require("../models/image");
const Template = require("../models/template");
const multer = require('multer');


module.exports.create = function (req, res, next){
    // console.log(req.file);
    const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        path: req.file.path
    });

    const template = new Template({
        _id: new mongoose.Types.ObjectId(),
        category: req.body.category,
        template_name: req.body.template_name
    });

    const result = new Result({
        _id: new mongoose.Types.ObjectId(),
        count: req.body.count,
        template: template._id,
        image: image._id,
    });

    result
    .save()
    .then(result => {
        res.status(201).json({
            message: "Result Created"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

module.exports.delete = function (req, res, next){

    Result.remove({_id: req.params.id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Result Deleted"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}