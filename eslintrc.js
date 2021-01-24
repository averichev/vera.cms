module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  rules: {
    'comma-dangle': ['warn', 'only-multiline'],
    complexity: ['warn', 5],
    'max-depth': ['warn', 3],
    'spaced-comment': ['error', 'always'],
    'max-lines': ['warn', 200],
    'max-lines-per-function': ['warn', 20],
    'max-nested-callbacks': ['warn', 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-escape': 'off',
    'vue/html-indent': ['warn', 4, {
      baseIndent: 1
    }],
    'vue/script-indent': ['warn', 2, {
      baseIndent: 1,
      switchCase: 1
    }]
  },
  overrides: [{
    files: ['*.vue'],
    rules: {
      indent: 'off',
      'max-lines': ['warn', 400]
    }
  }, {
    files: ['vue.config.js'],
    rules: {
      'max-lines-per-function': 'off'
    }
  }],
  parserOptions: {
    parser: 'babel-eslint'
  }
}
