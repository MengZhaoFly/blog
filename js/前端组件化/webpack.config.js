module.exports = {
	entry: './5-end-version.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									"targets": {
										"browsers": ["chrome 78"]
									},
								}
							]
						],
						plugins: [
							[
								"@babel/plugin-transform-react-jsx",
								{ pragma: "createElement" }
							]
						]
					}
				},
			},
			{
				test: /\.view/,
				use: {
					loader: require.resolve("./myloader.js")
				}
			}
		]
	},
	mode: "development",
	optimization: {
		minimize: false
	}
};