import path from 'path';
import webpack from 'webpack';

export default {
	devtools: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, '/client/index.js')
	], 
	output: {
		path: '/',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders : [
			{
				test: /\.js$/,
				exclude:path.resolve(__dirname, "node_modules"),
				loaders: ['react-hot','babel']	
			}
		]
	},
	resolve: {
		extensions: ['','.js']
	}
}