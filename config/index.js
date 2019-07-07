const path = require('path')

const env = process.env.NODE_ENV
const dev = env === 'development'
const staging = env === 'staging'
const production = env === 'production'

module.exports = {
	// database
	db: 'mongodb://localhost:27017/short-url',

	// app serving on
	host: process.env.HOST || '127.0.0.1',
	port: process.env.PORT || 3000,

	// env
	env,
	dev,
	staging,
	production,

	// app path
	path: path.normalize(`${__dirname}/..`)
}
