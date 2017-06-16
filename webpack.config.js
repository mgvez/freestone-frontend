const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const csswring = require('csswring');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';


const jsSourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './dist');
const imgPath = path.join(__dirname, './assets');
const sourcePath = path.join(__dirname, './src');

const plugins = [
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		filename: 'vendor.js',
		minChunks(module) {
			const context = module.context;
			return context && context.indexOf('node_modules') >= 0;
		},
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(nodeEnv),
		},
	}),
	new webpack.NamedModulesPlugin(),
	new HtmlWebpackPlugin({
		template: path.join(sourcePath, 'index.html'),
		path: buildPath,
		filename: 'index.html',
	}),
	new webpack.LoaderOptionsPlugin({
		options: {
			postcss: [
				autoprefixer({
					browsers: [
						'last 2 version',
						'ie >= 10',
					],
				}),
			],
			context: sourcePath,
		},
	}),

	new webpack.ProvidePlugin({
		jQuery: 'jquery',
	}),
];


// Common rules
const rules = [
	
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: [
			'react-hot-loader',
			'babel-loader',
			'eslint-loader',
		],
	},
	{
		test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
		include: imgPath,
		use: 'url-loader?limit=20480&name=assets/[name].[ext]',
	},

			
			// {
			// 	test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			// 	use: 'url?limit=10000&mimetype=application/font-woff',
			// }, {
			// 	test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			// 	use: 'url?limit=10000&mimetype=application/font-woff2',
			// }, {
			// 	test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			// 	use: 'url?limit=10000&mimetype=application/octet-stream',
			// }, {
			// 	test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
			// 	use: 'url?limit=10000&mimetype=application/font-otf',
			// }, {
			// 	test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			// 	use: 'file',
			// }, {
			// 	test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			// 	use: 'url?limit=10000&mimetype=image/svg+xml',
			// },
			// {
			// 	test: /\.png$/,
			// 	loader: 'file?name=[name].[ext]',
			// },
			// {
			// 	test: /\.jpg$/,
			// 	loader: 'file?name=[name].[ext]',
			// },

];

if (isProduction) {
	// Production plugins
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
			},
			output: {
				comments: false,
			},
		}),
		new ExtractTextPlugin('bundle.css'),
		new CopyWebpackPlugin([
			{ from: imgPath + '/**/*' }
		])
	);

	// Production rules
	rules.push(
		{
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader!postcss-loader!sass-loader',
			}),
		}
	);
} else {
	// Development plugins
	plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin()
	);

	// Development rules
	rules.push(
		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				'style-loader',
				// Using source maps breaks urls in the CSS loader
				// https://github.com/webpack/css-loader/issues/232
				// This comment solves it, but breaks testing from a local network
				// https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
				// 'css-loader?sourceMap',
				'css-loader',
				'postcss-loader',
				'sass-loader?sourceMap',
			],
		}
	);
}



module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		jsSourcePath + '/index',
	],
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/dist/'),
		publicPath: '/dist/',
	},

	// quiet: false,
	// noInfo: false,
	stats: {
		// Config for minimal console.log mess.
		assets: false,
		colors: true,
		version: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
	},

	plugins,

	resolve: {
		extensions: ['.js', '.json', '.jsx'],
		modules: [
			path.resolve(__dirname, 'node_modules'),
			jsSourcePath,
		],
		alias: {
			// require('tinymce') will do require('tinymce/tinymce') 
			tinymce: 'tinymce/tinymce',
		},
	},

	module: {
		rules,
	},
	devServer: {
		contentBase: isProduction ? buildPath : sourcePath,
		historyApiFallback: true,
		port: 3000,
		compress: isProduction,
		inline: !isProduction,
		hot: !isProduction,
		host: '0.0.0.0',
		stats: {
			assets: true,
			children: false,
			chunks: false,
			hash: false,
			modules: false,
			publicPath: false,
			timings: true,
			version: false,
			warnings: true,
			colors: {
				green: '\u001b[32m',
			},
		},
		headers: {
			"Access-Control-Allow-Origin": "*",
		}
	},
};
