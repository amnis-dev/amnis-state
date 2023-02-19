module.exports = {
  extends: ['@amnis/eslint-config-node', 'plugin:require-extensions/recommended'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
      },
    ],
  },
};
