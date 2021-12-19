const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
	_id : mongoose.Types.ObjectId,
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
	report:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Report'
	}
}, {timestamp: true});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;