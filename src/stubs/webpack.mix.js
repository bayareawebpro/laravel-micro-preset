/**
 * Laravel Micro Configuration Options.
 * Add these options to your current configuration.
 */
//Laravel Mix 4.0
mix.options({
    terser: {
        terserOptions: {
            mangle: {
                keep_fnames: true,
                reserved: [
                    'App',
                    'Config',
                    'Events',
                    'Kernel',
                    'Router',
                    'User',
                    'Vue',
                    'VueRoot',
                ]
            },
        }
    },
})
mix.webpackConfig({
    resolve: {
        alias: {'@pages': path.resolve(__dirname, 'resources/js/micro-app/pages')}
    },
    module: {
        rules: [{
            test: /\.js?$/,
            include: [ path.resolve(__dirname, "node_modules/laravel-micro.js") ],
            use: [{ loader: 'babel-loader', options: mix.config.babel()}]
        }]
    }
})
