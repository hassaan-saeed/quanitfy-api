const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	_id : mongoose.Types.ObjectId,
	path:{
		type: String,
		required: true
	},
}, {timestamp: true});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;