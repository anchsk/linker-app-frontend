module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.jsx'],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'sort-keys-fix'],
  rules: {
    'arrow-spacing': [
      2,
      {
        after: true,
        before: true,
      },
    ],
    eqeqeq: 2,

    'import/newline-after-import': 1,

    'import/order': [
      1,
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: 'react',
            position: 'before',
          },
          {
            group: 'sibling',
            pattern: './styled/**',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    /* 'indent': [
      'error',
      2
    ], */
    'linebreak-style': [2, 'unix'],
    'no-console': 1,
    'no-trailing-spaces': 1,
    'no-unused-vars': 1,
    'object-curly-spacing': [2, 'always'],
    quotes: ['error', 'single'],
    'react/jsx-sort-default-props': [2, { ignoreCase: false }],
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        reservedFirst: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
      },
    ],
    'react/prop-types': 0,

    semi: [2, 'never'],
    'sort-keys': 2,
    'sort-keys-fix/sort-keys-fix': 1,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
