const webpack = require('webpack');
const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const jsSourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './dist');
const assetsPath = path.join(__dirname, './src/assets');
const sourcePath = path.join(__dirname, './src');

// Common plugins
const plugins = [
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
];


// Common rules
const rules = [
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: [
			'react-hot-loader/webpack',
			'babel-loader',
			'eslint-loader',
		],
	},
	{
		test: /\.(ttf|eot|svg|woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?/,
		use: [
			{
				loader: 'url-loader?limit=20480',
			},
		],
	},
	{
		test: /\.(svg|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
		include: assetsPath,
		use: [
			{
				loader: 'file-loader?limit=20480',
			},
		],
	},
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
			{ from: assetsPath + '/**/*' }
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
			use: [
				'style-loader',
				// Using source maps breaks urls in the CSS loader
				// https://github.com/webpack/css-loader/issues/232
				// This comment solves it, but breaks testing from a local network
				// https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
				// 'css-loader?sourceMap',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: { sourceMap: true },
				},
				'sass-loader?sourceMap',
			],
			
		}
	);
}

module.exports = {
	devtool: isProduction ? false : 'source-map',
	context: jsSourcePath,
	entry: {
		js: './index.jsx',
	},
	output: {
		path: buildPath,
		publicPath: isProduction ? '' : '/',
		filename: 'bundle.js',
	},
	module: {
		rules,
	},
	resolve: {
		extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
		modules: [
			path.resolve(__dirname, 'node_modules'),
			jsSourcePath,
		],
		alias: {
			// require('tinymce') will do require('tinymce/tinymce') 
			tinymce: 'tinymce/tinymce',
		},

	},
	plugins,
	devServer: {
		contentBase: isProduction ? buildPath : sourcePath,
		historyApiFallback: true,
		port: 3000,
		compress: isProduction,
		inline: !isProduction,
		hot: !isProduction,
		host: '0.0.0.0',
		//to make sure that any host will work (provided it points to 127.0.0.1 and has the correct port)
		disableHostCheck: true,
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
		},
	},
};
