const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const utils = require("./utils");
const entry = require("../config/entry");

let newEntry = {};
for (let name in entry) {
  newEntry[name] = entry[name][0];
}

const baseWebpackConfig = {
  entry: newEntry,
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".pcss"],
    alias: {
      // "@app": path.resolve("../../app"),
    }
  },
  optimization: {
    // 包清单
    runtimeChunk: {
      name: "manifest"
    },
    //拆分公共包
    splitChunks: {
      cacheGroups: {
        //项目公共组件
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        //第三方组件
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [new webpack.BannerPlugin("Copyright © ernan")],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  }
};

module.exports = baseWebpackConfig;
