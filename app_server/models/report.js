const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
    graph:[{
        category: String,
        count: Number
    }],
	file:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'File'
	},
}, {timestamp: true});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;