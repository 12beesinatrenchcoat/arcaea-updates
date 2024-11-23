import eslint from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import globals from "globals";
import tseslint from "typescript-eslint";
import xoBrowser from "eslint-config-xo";
import svelteConfig from "./svelte.config.js";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs["flat/recommended"],
	...xoBrowser,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser,
				svelteConfig,
			},
		},
	},
	{
		rules: {
			quotes: ["error", "double"],
			"@stylistic/quotes": ["error", "double"],
		},
	},
	{
		ignores: ["build/", ".svelte-kit/", "dist/"],
	},
);
