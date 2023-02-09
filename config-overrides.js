const webpack = require('webpack');

module.exports = {
webpack: function(config, env) {
const fallback = config.resolve.fallback || {};
Object.assign(fallback, {
"stream": require.resolve("stream-browserify"),
"http": require.resolve("stream-http"),
"https": require.resolve("https-browserify"),
"url": require.resolve("url"),
"crypto": require.resolve("crypto-browserify"),
"zlib": require.resolve("browserify-zlib"),
"path": require.resolve("path-browserify"),
        "fs": require.resolve("graceful-fs"),
        "buffer": require.resolve("buffer"),
})
config.resolve.fallback = fallback;
config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
    }),
    new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        const mod = resource.request.replace(/^node:/, "");
        switch (mod) {
            case "buffer":
                resource.request = "buffer";
                break;
            case "stream":
                resource.request = "readable-stream";
                break;
            default:
                throw new Error(`Not found ${mod}`);
        }
    }),
]);
config.module.rules.push({
    test: /\.m?js/,
    resolve: {
        fullySpecified: false,
        fallback: {
            "fs": false
        },
    }
    
})
config.ignoreWarnings = [/Failed to parse source map/];
return config;
},
}