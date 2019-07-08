module.exports = {
	env: {
		browser: true,
		node: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2018
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'off'
	}
};
