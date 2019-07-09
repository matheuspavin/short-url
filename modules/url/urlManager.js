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

exports.delete = async ({ id }) => {
	return urlModel.findByIdAndDelete(id);
};

exports.get = async ({ id }) => {
	const url = await urlModel.findById(id);
	if (!url) throw Boom.notFound('Não foi possível encontrar a url!');
	return url;
};

exports.getStats = async ({ id }) => {
	const $match = {};
	if (id) $match.user = id;

	const [urlCount, hits, topUrls] = await Promise.all([
		urlModel.find($match).countDocuments(),
		urlModel.aggregate([
			{ $match },
			{ $group: { _id: null, hits: { $sum: '$hits' } } },
			{ $limit: 10 }
		]),
		urlModel
			.find($match)
			.sort('-hits')
			.limit(10)
	]);

	return { hits: hits[0].hits, urlCount, topUrls };
};
