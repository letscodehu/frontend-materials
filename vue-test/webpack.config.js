const VueLoaderPlugin = require("vue-loader/lib/plugin");


module.exports = {
    entry : "./index.js",
    resolve : {
        alias: {
            'vue$' : 'vue/dist/vue.esm.js'
        }
    },
    module : {
        rules: [
            {
                test: /\.css$/,
                loader: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};