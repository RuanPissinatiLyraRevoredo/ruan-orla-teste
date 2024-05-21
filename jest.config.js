module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest-setup.js'],
  verbose: true,
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|@react-navigation)',
  ],
};
