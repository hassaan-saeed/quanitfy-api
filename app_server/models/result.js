const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
	count:{
		type: Number,
		required: true
	},
	template:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Template'
	},
	image:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Image'
	},
}, {timestamp: true});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;