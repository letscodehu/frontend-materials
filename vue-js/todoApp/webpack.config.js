const nodeExternals = require("webpack-node-externals")

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader : 'vue-loader'
            }
        ]
    },
    externals : [nodeExternals()]
}