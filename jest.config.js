const { defaults } = require('jest-config');
module.exports = {
    // ...
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx', 'ts', 'tsx'],
    transform: {
        '^.+\\.js$': '<rootDir>/jest.transform.js'
    },
    setupFiles: [
        "<rootDir>/jest.init.js"
    ],
    // ...
};