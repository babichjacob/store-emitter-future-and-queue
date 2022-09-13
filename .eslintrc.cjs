module.exports = {
	root: true,
	extends: ["eslint:recommended", "prettier"],
	parserOptions: {
		sourceType: "module",
	},
	env: {
		es2022: true,
		node: true,
	},
	plugins: ["only-warn"],
	rules: {
		"no-constant-condition": [
			"warn",
			{
				checkLoops: false,
			},
		],
	},
};
