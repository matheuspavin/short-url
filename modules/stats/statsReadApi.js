const express = require('express');
const router = express.Router({ mergeParams: true });
const urlManager = require('../url/urlManager');

module.exports = app => {
	app.use('/stats', router);
};

router.get('/:id', async (req, res, next) => {
	try {
		res.json(await urlManager.get(req.params));
	} catch (error) {
		next(error);
	}
});
