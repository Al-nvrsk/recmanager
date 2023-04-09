module.exports = {
  root: true,
  extends: [
    "custom",
    'plugin:i18next/recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'airbnb/hooks',
    'prettier'
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'forapp-plugin',
    'unused-imports',
  ],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4],
    indent: [2, 4],
    'react/jsx-filename-extension': [2, {
      extensions: ['.js', '.jsx', '.tsx'],
    }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'consistent-return': 'off',
    'i18next/no-literal-string': ['error', {
      markupOnly: true,
    }],
    'max-len': ['error', {
      code: 25,
      ignoreComments: true,
    }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_' },
    ],
    'forapp-plugin/path-checker': ['error', { alias: '@' }],
    'forapp-plugin/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
      },
    ],
    'forapp-plugin/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
      },
    ],
  },
  globals: {
    __IS_DEV__: true,
  },
};
