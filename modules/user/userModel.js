const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		_id: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

exports.userModel = mongoose.model('User', userSchema);
