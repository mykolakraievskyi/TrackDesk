import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-unused-vars': ['error'],
			'@typescript-eslint/explicit-function-return-type': ['warn'],
			'@typescript-eslint/no-explicit-any': ['warn'],
			'@typescript-eslint/no-inferrable-types': ['off'],
		},
	},
]
