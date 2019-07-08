const { urlModel } = require('./urlModel');
const userManager = require('../user/userManager');
const { shortUrl } = require('../../utils/url');
const Boom = require('boom');

exports.create = async ({ userId, url }) => {
	const user = await userManager.getById({ id: userId });

	if (!user) throw Boom.badData(`Usuário não existe. Id: ${userId}`);

	if (!url) throw Boom.badData('Favor informar url');

	const urlObj = new urlModel({ user: userId, url, shortUrl: shortUrl() });
	return urlObj.save();
};
