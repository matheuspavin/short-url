const express = require('express');
const router = express.Router({ mergeParams: true });
const userManager = require('./userManager');
const urlManager = require('../url/urlManager');

module.exports = app => {
	app.use('/users', router);
};

router.post('/', async (req, res, next) => {
	try {
		res.json(await userManager.create(req.body));
	} catch (error) {
		return next(error);
	}
});

router.post('/:id/urls', async (req, res, next) => {
	try {
		res.json(await urlManager.create({ userId: req.params.id, ...req.body }));
	} catch (error) {
		return next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		res.json(await userManager.delete(req.params));
	} catch (error) {
		return next(error);
	}
});
