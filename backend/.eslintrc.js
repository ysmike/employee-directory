module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-unused-vars': 0,
    'no-irregular-whitespace': 0,
    'consistent-return': 0,
    'func-names': 0,
    'no-restricted-syntax': 0,
    'no-console': 0,
    'max-len': 0,
    'space-before-function-paren': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'import/prefer-default-export': 0,
    'react/react-in-jsx-scope': 0,
  },
};
