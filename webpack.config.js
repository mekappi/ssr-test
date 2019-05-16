/*
    webpack --mode production
        - optimization.minimizerが有効になり圧縮されたファイルが出力される
    webpack --mode development
*/
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require("path");

module.exports = {
  entry: {
    bundle: "./src/index.tsx"
  },
  output: {
    filename: "[name].js",
    // cssのファイル等をCDNに置いている場合はこのpublicpathに自動で置き換えられる
    publicPath: "/",
    // 出力の設定。
    // 出力するファイル名や出力先のパスを指定する。
    // OSによってパスが異なることを防ぐために、出力先のパスの指定にはpath.join()を利用する。
    path: path.join(__dirname, "/public/")
  },
  module: {
    rules: [
      {
        test: /\.*(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          // loaderは右から順に処理される
          // ts -> [ts-loader] -> js -> [babel] -> js
          {
            // webpackをマルチスレッド化
            loader: "thread-loader",
            options: {
              workers: require("os").cpus().length - 1,
              poolTimeout: Infinity
            }
          },
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: {
              // 型を無視し、ts -> jsのコンパイルのみを行うようにする
              happyPackMode: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [
    // HTMLテンプレート
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html"
    }),
    // コンパイル時間短縮のため、型エラーのみを検知するようにするためのplugin
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new CopyPlugin([
      { from: "./images/**", to: "./" },
      { from: "./manifest.json", to: "./" }
    ])
  ]
};
