const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	_id : mongoose.Types.ObjectId,
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	password:{
		type: String,
		required: true
	},
	business:{
		type: Boolean,
		default: false
	}
}, {timestamp: true});

const User = mongoose.model('User', userSchema);
module.exports = User;