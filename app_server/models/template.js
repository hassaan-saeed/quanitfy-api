const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
	_id : mongoose.Types.ObjectId,
	category:{
		type: String,
		required: true
	},
	template_name:{
		type: String,
		required: true
	},
}, {timestamp: true});

const Template = mongoose.model('Template', templateSchema);
module.exports = Template;