const webpack = require('webpack');
const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { console } = require('fp-ts');

console.log(process.env.NODE_ENV);
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
console.log('isProduction', isProduction);

const jsSourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './dist');
const assetsPath = path.join(__dirname, './src/assets');
const sourcePath = path.join(__dirname, './src');

//https OR http
const isHttp = process.argv.length === 0 || !~process.argv.indexOf('--https');

// Common plugins
const plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(nodeEnv),
		},
	}),
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
		exclude: [/node_modules/],
		use: [
			// 'react-hot-loader/webpack',
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
	// {
	// 	test: /\.s(a|c)ss$/,
	// 	exclude: /\.module.(s(a|c)ss)$/,
	// 	use: {
	// 		loader: [
	// 			!isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
	// 			'css-loader',
	// 			{
	// 				loader: 'sass-loader',
	// 				options: {
	// 					sourceMap: !isProduction,
	// 				},
	// 			},
	// 		],
	// 	},
	// },
];

const optimization = {};

if (isProduction) {
	// Production plugins

	optimization.minimizer = [
		new UglifyJsPlugin({
			// sourceMap: false,
			uglifyOptions: {
				warnings: false,
				ie8: false,
				// conditionals: true,
				// unused: true,
				// comparisons: true,
				// sequences: true,
				// dead_code: true,
				// evaluate: true,
				// if_return: true,
				// join_vars: true,
			},
		}),
	];

	plugins.push(
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 		screw_ie8: true,
		// 		conditionals: true,
		// 		unused: true,
		// 		comparisons: true,
		// 		sequences: true,
		// 		dead_code: true,
		// 		evaluate: true,
		// 		if_return: true,
		// 		join_vars: true,
		// 	},
		// 	output: {
		// 		comments: false,
		// 	},
		// }),
		new CopyWebpackPlugin(
			{
				patterns: [
					{ from: assetsPath + '/**/*', to: buildPath },
				],
			}
		),
		new MiniCssExtractPlugin({ filename: 'bundle.css' }),
	);

	// Production rules
	rules.push(
		{
			test: /\.scss$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
				},
				'css-loader',
				'postcss-loader',
				'sass-loader',
			],
		}
	);
} else {
	// Development plugins
	plugins.push(
		// new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin()
	);

	// Development rules
	rules.push(
		{
			test: /\.scss$/,
			use: [
				'style-loader',
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
	mode: isProduction ? 'production' : 'development',
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
		port: isHttp ? 2999 : 3000,
		https: !isHttp,
		compress: isProduction,
		inline: !isProduction,
		// hot: !isProduction,
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
