import ljharbConfig from '@ljharb/eslint-config/flat';

export default [
	...ljharbConfig,
	{
		files: ['index.js'],
		rules: {
			complexity: 'off',
			'no-param-reassign': 'warn',
		},
	},
	{
		files: ['test/**/*.js'],
		rules: {
			'getter-return': 'off',
			'id-length': 'off',
			'max-lines-per-function': 'warn',
		},
	},
];
