const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    graph:[{
        category: String,
        count: Number
    }],
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
}, {timestamp: true});

const File = mongoose.model('File', fileSchema);
module.exports = File;