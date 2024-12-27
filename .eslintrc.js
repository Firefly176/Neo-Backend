module.exports = {
  env: {
    node: true,
    es6: true,
    commonjs: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'warn',
  },
};
