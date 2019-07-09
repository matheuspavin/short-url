const express = require('express');
const Boom = require('boom');
const morgan = require('morgan');
const glob = require('glob');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();

// app.use(cors('*'));
// app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));

// const apis = glob.sync(`${config.path}/**/*Api.js`);
// app.use(morgan('dev'));
// apis.forEach(apiPath => {
// 	require(`${apiPath}`)(app);
// });

async function start() {
	// Enable cors in dev mode
	if (config.dev) {
		app.use(cors());
	}

	// Enable api usage logging
	if (config.dev) {
		app.use(morgan('dev'));
	} else {
		app.use(morgan('short'));
	}

	// Enable parsers with larger payloads
	app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

	// Connect to MongoDB
	if (process.env.NODE_ENV === 'test') {
		const mongoServer = new MongoMemoryServer();
		mongoServer.getConnectionString().then(mongoUri => {
			mongoose.connect(mongoUri, {
				config: { autoIndex: true },
				useNewUrlParser: true
			});
		});
	} else {
		mongoose.connect(config.db, {
			config: { autoIndex: true },
			useNewUrlParser: true
		});
	}

	const db = mongoose.connection;
	db.on('error', () => {
		throw new Error(`Unable to connect to database at ${config.db}`);
	});

	// Load Mongoose Models and Global Helpers
	const models = glob.sync(`${config.path}/**/*Model.js`);
	models.forEach(modelPath => {
		require(`${modelPath}`);
	});

	// Load APIs
	const apis = glob.sync(`${config.path}/**/*Api.js`);
	apis.forEach(apiPath => {
		require(`${apiPath}`)(app);
	});
	// Error handling
	//eslint-disable-next-line
	app.use((err, req, res, next) => {
		const error = Boom.isBoom(err) ? err : Boom.boomify(err);
		res
			.status(error.output.statusCode)
			.json({ message: error.message, error: error.output.payload.error });
	});

	// Listen the server
	app.listen(config.port, config.host);
}

start();
module.exports = app;
