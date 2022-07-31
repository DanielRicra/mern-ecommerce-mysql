module.exports = {
   'env': {
      'es2021': true,
      'node': true,
      'jest': true
   },
   'extends': 'eslint:recommended',
   'parserOptions': {
      'ecmaVersion': 'latest',
      'sourceType': 'module'
   },
   'rules': {
      'indent': [
         'error',
         3
      ],
      'linebreak-style': 0,
      'quotes': [
         'error',
         'single'
      ],
      'semi': [
         'error',
         'always'
      ],
      'no-unused-vars': [
         'error', 
         { 'vars': 'local', 'args': 'none', 'ignoreRestSiblings': false }
      ]
   }
};