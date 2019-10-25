require("@babel/polyfill");
const path = require("path");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
    distDir: "../build",
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@/": path.resolve(__dirname, "src"),
        };

        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new TsConfigPathsPlugin({ configFile: "./src/tsconfig.json" }),
        ];
        return config;
    },
};
