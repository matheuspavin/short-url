const express = require('express');
const router = express.Router({ mergeParams: true });
const urlManager = require('./urlManager');

module.exports = app => {
	app.use('/urls', router);
};

router.get('/:id', async (req, res, next) => {
	try {
		const { url } = await urlManager.get(req.params);
		res.status(301).json(url);
	} catch (error) {
		next(error);
	}
});
