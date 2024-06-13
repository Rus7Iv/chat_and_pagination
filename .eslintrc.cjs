module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'semi': ['error', 'never'],
    'import/order': ['error', { 'alphabetize': { 'order': 'asc' } }],
    'max-len': ['error', { 'code': 120 }],
    'prettier/prettier': ['error', { 'semi': false, 'singleQuote': true }],
    '@typescript-eslint/explicit-module-boundary-types': 'off', 
    '@typescript-eslint/no-explicit-any': 'off',
  },
};