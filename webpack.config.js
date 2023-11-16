import path from 'path'

export  default {
    // ...other configurations...
    resolve: {
        alias: {
            '@': path.resolve(__dirname),
        },
    },
};
