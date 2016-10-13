const path = require('path')
const { resolve } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const join = dest => path.resolve(__dirname, dest)

const web = dest => join('web/static/' + dest)


module.exports = (env) => {
  const css_ = [
    'css-loader?sourceMap',
    'postcss-loader'
  ].join('!');

  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);

  return {
    entry: {
      application: [
        web('css/app.sass'),
        web('js/app.js')
      ]
    },
    output: {
      path: join('priv/static'),
      filename: 'js/app.js'
    },
    context: web('js'),
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    module: {
      noParse: /vendor\/phoenix/,
      // preLoaders: [
      //   {
      //     test: /\.js[x]?$/,
      //     loader: 'eslint',
      //     exclude: /node_modules/
      //   }
      // ],
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true
          }
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: css_})
        },
        {
          test: /\.sass$/,
          loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules'})
        },
        {
          test: /\.jpg/,
          loader: 'url-loader',
          query: {
            limit: 8192,
            mimetype: 'image/jpg',
            name: '/images/[name].[ext]'
          }
        },
        {test: /\.gif/, loader: 'url-loader?limit=8192&mimetype=image/gif&name=/images/[name].[ext]'},
        {test: /\.png/, loader: 'url-loader?limit=8192&mimetype=image/png&name=/images/[name].[ext]'},
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=100000&minetype=application/font-woff'
        },
        {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?limit=100000'}
      ]
    },
    resolve: {
      modules: [
        web('js'),
        'node_modules'
      ],
      extensions: [
        '.js',
        '.jsx',
        '.sass',
        '.json'
      ]
    },
    plugins: removeEmpty([
      // new HtmlWebpackPlugin({
      //   template: './index.html'
      // }),

      new ExtractTextPlugin({filename: 'css/app.css', disable: false, allChunks: true}),

      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })),

      ifProd(new webpack.optimize.DedupePlugin()),

      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true
      })),

      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })),

      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // eslint-disable-line
          warnings: false
        }
      }))
    ])
  };
};