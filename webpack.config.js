const webpack = require('webpack');
const path = require('path');
const DotEnv = require('dotenv');
const ExtractTextPlugin = require('extract-text-webpack-plugin');



process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
   DotEnv.config({ path: '.env.development' });
}

module.exports = (env) => {

   // posielam z package.json scriptov --env. Vraciam true / false hodnoty
   const isProduction = env === 'production';
   const CSSExtract = new ExtractTextPlugin('styles.css');

   return {
      entry: ['babel-polyfill', './src/app.js'],
      output: {
         path: path.resolve(__dirname, 'public', 'dist'),
         filename: 'bundle.js'
      },
      module: {
         rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
         }, {
            test: /\.s?css$/,
            use: CSSExtract.extract({
               use: [
                  {
                     loader: 'css-loader',
                     options: {
                        sourceMap: true
                     }
                  },
                  {
                     loader: 'sass-loader',
                     options: {
                        sourceMap: true
                     }
                  }

               ]
            })
         }],
      },
      plugins: [
         CSSExtract,
         new webpack.DefinePlugin({
            'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
            'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
         })
      ],
      devtool: isProduction ? 'source-map' : 'inline-source-map',
      devServer: {
         contentBase: path.join(__dirname, 'public'),
         historyApiFallback: true,
         publicPath: '/dist/'
      }
   }
};