const
dateConfig = require('./src/common/base/src/config/date.js'),
collectionsConfig = require('./src/config/collections.js')

module.exports = (eleventyConfig) => {
	const inputDir = 'src/it'
	require('./.eleventy')(eleventyConfig)
	eleventyConfig.addPlugin(dateConfig, {
		defaultLocale: 'it',
		defaultFormat: 'DD MMM YYYY'
	})
	eleventyConfig.addPlugin(collectionsConfig, { inputDir })
	return {
		passthroughFileCopy: true,
		dir: {
			input: inputDir,
			output: 'dist/it',
			data: '../data',
			includes: '../includes',
			layouts: '../layouts'
		}
	}
}
