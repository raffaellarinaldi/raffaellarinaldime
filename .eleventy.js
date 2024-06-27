const
eleventyNavigationPlugin = require('@11ty/eleventy-navigation'),
baseConfig = require('./src/common/base/src/config/base.js'),
dateConfig = require('./src/common/base/src/config/date.js'),
collectionsConfig = require('./src/config/collections.js'),
themeConfig = require('./src/config/theme.js'),
eleventySass = require('eleventy-sass'),
minifyConfig = require('./src/common/base/src/config/minify.js')

module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(baseConfig)
	eleventyConfig.addPlugin(dateConfig, {
		defaultLocale: 'en',
		defaultFormat: 'MMM D YYYY'
	})
	eleventyConfig.addPlugin(collectionsConfig)
	eleventyConfig.addPlugin(themeConfig)
	eleventyConfig.addPlugin(eleventyNavigationPlugin)
	eleventyConfig.addPlugin(eleventySass)
	eleventyConfig.addWatchTarget('./src/assets/')
	eleventyConfig.addPlugin(minifyConfig)
	eleventyConfig.addLayoutAlias({
    base: '../layouts/base.njk',
    contact: '../layouts/contact.njk',
    error404: '../layouts/error404.njk',
    home: '../layouts/home.njk',
    post: '../layouts/post.njk',
    posts: '../layouts/posts.njk',
    project: '../layouts/project.njk',
    projects: '../layouts/projects.njk',
    resume: '../layouts/resume.njk',
    talks: '../layouts/talks.njk'
  })
	return {
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      data: 'data',
      includes: 'includes',
      layouts: 'layouts',
      output: 'dist',
    }
	}
}
