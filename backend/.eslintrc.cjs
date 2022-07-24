module.exports = {
   'env': {
      'es2021': true,
      'node': true
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
      ]
   }
};