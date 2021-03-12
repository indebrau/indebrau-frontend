module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es6: true,
  },
  settings: {
    react: { pragma: 'React', version: 'detect' },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: ['react', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
  },
};
