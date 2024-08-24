const
eleventyNavigationPlugin = require('@11ty/eleventy-navigation'),
baseConfig = require('./src/common/base/src/config/base.js'),
dateConfig = require('./src/common/base/src/config/date.js'),
collectionsConfig = require('./src/config/collections.js'),
themeConfig = require('./src/config/theme.js'),
eleventySass = require('eleventy-sass'),
{ EleventyI18nPlugin } = require('@11ty/eleventy'),
minifyConfig = require('./src/common/base/src/config/minify.js')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(baseConfig)
  eleventyConfig.addPlugin(dateConfig, {
    defaultLocale: 'it',
    defaultFormat: 'DD MMM YYYY'
  })
  eleventyConfig.addPlugin(dateConfig, {
    defaultLocale: 'en',
    defaultFormat: 'MMM D YYYY'
  })
  eleventyConfig.addPassthroughCopy({}) //serve??
  eleventyConfig.addPlugin(collectionsConfig)
  eleventyConfig.addPlugin(themeConfig)
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(eleventySass, [{
    sass: { style: 'compressed', sourceMap: false },
    rev: true,
    when: [{ ELEVENTY_ENV: 'deployment' }, { ELEVENTY_ENV: false }]
  }])
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
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'it',
  })
  
  // Eleventy debug configuration
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setWatchJavaScriptDependencies(false);
  eleventyConfig.setTemplateFormats(['html', 'md', 'njk']);

  // Only debug in development mode
  if (process.env.NODE_ENV === 'development') {
    eleventyConfig.setQuietMode(false);
    eleventyConfig.setBrowserSyncConfig({
      logLevel: 'debug',
      open: true
    });
  }


  return {
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: 'dist',
      data: 'data',
      includes: 'includes',
      layouts: 'layouts'
    }
  }
}