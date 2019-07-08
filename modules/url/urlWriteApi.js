const express = require('express');
const router = express.Router({ mergeParams: true });
const urlManager = require('./urlManager');

module.exports = app => {
	app.use('/urls', router);
};

router.delete('/:id', async (req, res, next) => {
	try {
		await urlManager.delete(req.params);

		//retornar vazio?
		res.json({});
	} catch (error) {
		next(error);
	}
});
