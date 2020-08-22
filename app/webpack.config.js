var path = require("path"),
    webpack = require("webpack");

var config = {
    entry: path.join(__dirname, "./scripts/app.js"),
    output: {
        path: path.join(__dirname, "./bundle"),
        publicPath: "/",
        filename: "app.js"
    },
    resolve: {
        // tells webpack to query these directories for modules
        modulesDirectories: ["bower_components"]
    },
    plugins: [
        // this plugin makes webpack not only looking for package.json,
        // but also for a bower.json with a main-field
        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ])
    ],
    module: {
        loaders: [
            // "test" should be a regular expression that is run
            // against the path
            // "loader" tells webpack what loaders should be applied
            { test: /[\/\\]angular\.js$/, loader: "exports?window.angular" }
            { test: /[\/]angular-resource\.js$/, loader: 'exports?angular.module(\'ngResource\')' }
        ]
    }
};

module.exports = config;
