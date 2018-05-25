const path = require("path");
const webpack = require("webpack"); //引入webpack
const opn = require("opn"); //打开浏览器
const merge = require("webpack-merge"); //webpack配置文件合并

const baseWebpackConfig = require("./webpack.base.conf"); //基础配置
const config = require("../config"); //一些路径配置

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

let devWebpackConfig = merge(baseWebpackConfig, {
  /*设置开发环境*/
  mode: "development",
  output: {
    path: path.resolve(config.devDirectory),
    filename: "js/[name].js",
    chunkFilename: "js/[name].js",
    publicPath: ""
  },
  plugins: [
    /*设置热更新*/
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader", "cache-loader"],
        include: [resolve("app"), resolve("entryBuild")],
        exclude: [resolve("node_modules")]
      },
      {
        test: /\.(css|pcss)$/,
        loader:
          "style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap",
        exclude: /node_modules/
      }
    ]
  },
  /*设置api转发*/
  devServer: {
    host: config.host,
    port: config.port,
    hot: true,
    inline: true,
    contentBase: path.resolve(config.devDirectory),
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: [
      {
        //   context: ["/api/**", "/u/**"],
        //   target: "http://192.168.12.100:8080/",
        //   secure: false
        // }, {
        "/": {
          bypass: function(req, res, proxyOptions) {
            console.log("Skipping proxy for browser request.");
            // return `${PUBLICPATH}/index.html`
          }
        }
      }
    ],
    /*打开浏览器 并打开本项目网址*/
    after() {
      opn("http://localhost:" + this.port);
    }
  }
});
module.exports = devWebpackConfig;
