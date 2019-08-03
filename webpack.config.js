const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssNano = require('cssnano');
const CompressionPlugin = require('compression-webpack-plugin');

const config = {
  // a polyfill segitsegevel hasznalhatjuk az uj featureoket regebbi bongeszokbe is, a tomb elejere teve olyan mintha a main.jsbe elso sorban beimportalnank
  entry: ['@babel/polyfill', path.join(__dirname, 'src/main.js')],
  output: {
    // ha a fileNamenek bundle[contenthash].js-t adnank akkor a webpack generalna nekunk hasht content alapjan, hasznos a cacheleshez pl
    filename: 'bundle.js', //[contenthash] [hash]
    path: path.resolve(__dirname, 'build/assets')
  },
  resolve: {
    alias: {
      // ezekkel tesszuk lehetove, hogy a forraskodunkba hivatkozhassunk ezekre a mappakra egyszeruen relativ eleresi utvonal nelkul
      components: path.resolve(__dirname, 'src/components/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      pages: path.resolve(__dirname, 'src/pages/')
    },
    // ezeknel a tipusoknal eleg a fajl nev nem kell hozza tennunk a kiterjesztest
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        // ha ez a regexp true egy adott fajlra akkor arra hasznalja a rule-t a tobbire nem (.js es .jsx)
        test: /\.js(x?)$/,
        // a node_modules mappat ignoralaja
        exclude: /(node_modules)/,
        use: {
          // ez fusson le, a babel-loader es5os kodot allit elo a mi es6os kodunkbol
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: [
              // ezzel a pluginnal tudunk a classainkba olyat, hogy vmiFv = () => {}
              'transform-class-properties',
            ],
          },
        },
      },
      {
        test: /\.less$/,
        // a 'use' egy pipeline, tobb loadert is beadhatunk neki, ami alulrol felfele haladva dolgozza fel a testnek megfelelt fajlokat,
        // az egyik kimenete a kovetkezo bemenete. Itt most: a lessbol eloszor csst csinalunk, majd a csst betoltjuk, majd extractaljuk kulon fajlba
        use: [
          // ezzel a loaderrel inline style tageket generalna egy js script (hozza adna automatikusan a bundleunkhoz) a headerunkbe
          // {
          //   loader: 'style-loader', // creates style nodes from JS strings
          // },
          {
          	loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'bundle.css', }),
  ],
  // Alapbol minifyolna nekunk a webpack de ezt kikapcsolhatjuk
  optimization: { minimize: false }
};

// ha a webpacket --env.valami flaggel inditjuk akkor tudunk kornyezeti valtozokat adni a configunknak,
// ehhez azonban az is kell, hogy sima object helyett fv-t exportaljunk ki ami visszater a config objecttel
module.exports = (env = {}) => {
  if (env.production) {

    // production modban optimalizalni szeretnenk a csst is, devbe azert nem, hogy konnyebb legyen debuggolni
    config.plugins.push(new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.(css|less)$/g,
      cssProcessor: cssNano,
    }));

    // csinaljunk egy gzippelt verziot a kissebb meret miatt, egyebkent annyira testre szabhato ez a plugin,
    // hogy akar sajat algoritmust is irhatunk hozza vagy egy kulso libet hasznalunk
    config.plugins.push(new CompressionPlugin());

    config.optimization = {
      minimizer: [
        // a TerserJs minifyolja a js-unket --> kissebb file meret
        new TerserJSPlugin({ cache: true, parallel: true, terserOptions: { output: { comments: false } } }),
        new OptimizeCssAssetsPlugin({})
      ],
    };
  }

	return config;
};
