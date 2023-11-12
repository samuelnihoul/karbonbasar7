const path = require('path');

module.exports = {
    // ...other configurations...
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'path/to/your/root/directory'),
        },
    },
};
