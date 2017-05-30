var path = require('path');
var webpack = require('webpack');
var node_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: './client/index.js',

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
       loaders : [
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, 'client'),
            path.join(__dirname, 'server/shared'),
          ],
          loaders: ['babel']
        },
        {
	      test: /\.css$/, // Only .css files
		  loader: 'style!css' // Run both loaders
	    }
      ]
    },

    plugins: [
     	new webpack.DefinePlugin({
	"process.env": {
		"NODE_ENV": JSON.stringify("production")
	}
      }),
       new webpack.optimize.UglifyJsPlugin({
	minimize: true,
	compress: {
			warnings: false
	}
       }),
    ],
    resolve: {
		  extensions: ['','.js','.jsx']
	  }
};
