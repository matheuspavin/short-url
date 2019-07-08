const { host, port } = require('../../config');

exports.shortUrl = () => {
	let random = Math.random()
		.toString(36)
		.substring(5);
	return `http://${host}:${port}/${random}`;
};
