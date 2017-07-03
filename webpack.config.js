const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "app", "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "dist"
    },
    /*module: {
        loaders: [

        ]
    },*/
    resolve: {
        extensions: [".js"]
    }
}
