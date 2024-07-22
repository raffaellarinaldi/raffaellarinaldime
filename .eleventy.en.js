const
dateConfig = require('./src/common/base/src/config/date.js'),
collectionsConfig = require('./src/config/collections.js')

module.exports = (eleventyConfig) => {
	const inputDir = 'src/en'
	require('./.eleventy')(eleventyConfig)
	eleventyConfig.addPlugin(dateConfig, {
		defaultLocale: 'en',
		defaultFormat: 'MMM D YYYY'
	})
	eleventyConfig.addPlugin(collectionsConfig, { inputDir })
	return {
		passthroughFileCopy: true,
		dir: {
			input: inputDir,
			output: 'dist/en',
			data: '../data',
			includes: '../includes',
			layouts: '../layouts'
		}
	}
}
