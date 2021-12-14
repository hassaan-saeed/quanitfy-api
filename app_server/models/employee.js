const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	role:{
		type: String,
		required: true
	},
	creator:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
}, {timestamp: true});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;