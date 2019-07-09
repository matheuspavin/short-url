const express = require('express');
const router = express.Router({ mergeParams: true });
const urlManager = require('../url/urlManager');

module.exports = app => {
	app.use('/users', router);
};

router.get('/:id/stats', async (req, res, next) => {
	try {
		res.json(await urlManager.getStats(req.params));
	} catch (error) {
		next(error);
	}
});
