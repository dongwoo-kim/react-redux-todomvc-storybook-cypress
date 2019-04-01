module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  globals: {
    cy: 'readonly'
  }
};
