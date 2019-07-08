const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
	{
		hits: {
			type: Number,
			default: 0
		},
		url: { type: String, required: true },
		shortUrl: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.String,
			index: true,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);

exports.urlModel = mongoose.model('Url', urlSchema);
