const js = require('@eslint/js')
const globals = require('globals')
const jestPlugin = require('eslint-plugin-jest')
const cypressPlugin = require('eslint-plugin-cypress')
const eslintConfigPrettier = require('eslint-config-prettier')

module.exports = [
  {
    ignores: ['node_modules/**', 'bower_components/**', 'dist/**', 'coverage/**', '.idea/**'],
  },
  js.configs.recommended,
  jestPlugin.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
        ...cypressPlugin.configs.globals.languageOptions.globals,
      },
    },
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'cypress/no-async-tests': 'error',
      'cypress/no-pause': 'error',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'off',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'jest/expect-expect': 'off',
    },
  },
  eslintConfigPrettier,
]
