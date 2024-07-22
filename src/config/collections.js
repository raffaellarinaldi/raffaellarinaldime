const fs = require('fs');
const path = require('path');
const grayMatter = require('gray-matter');
const deepMerge = require('deepmerge');

// Supported languages (currently here, will move to data/languages.js later)
const supportedLanguages = [
  { code: 'it', name: 'Italiano' },
  { code: 'en', name: 'English' }
];

module.exports = function(eleventyConfig) {

  // Get data for specific language
  const getLangData = (lang, inputPath) => {
    const langFilePath = path.join('src', lang.code, 'collections', 'projects', path.basename(inputPath));

    if (fs.existsSync(langFilePath)) {
      const langFileContent = fs.readFileSync(langFilePath, 'utf8');
      const { data: langFileFrontMatter, content: langFileContentWithoutFrontmatter } = grayMatter(langFileContent);

      return {
        frontmatter: langFileFrontMatter,
        content: langFileContentWithoutFrontmatter
      };
    }
    return {
      frontmatter: {},
      content: ''
    };
  };

  // Collection 'projects'
  eleventyConfig.addCollection('projects', collectionApi => {
    const projects = {};

    // Get all project files for main language folder (Italian)
    const mainProjects = collectionApi.getFilteredByGlob('./src/collections/projects/*.md');

    // Iterates through main projects
    mainProjects.forEach(file => {
      const baseContent = fs.readFileSync(file.inputPath, 'utf8');
      const { data: baseFrontMatter, content: baseContentWithoutFrontmatter } = grayMatter(baseContent);

      // Main data for Italian version
      const mainData = {
        data: {
          ...baseFrontMatter
        },
        url: `/portfolio/${file.fileSlug}/`,
        lang: 'it',
        content: baseContentWithoutFrontmatter
      };

      // Initialize empty object for translations
      projects[file.fileSlug] = {};

      // Add data for Italian version
      projects[file.fileSlug]['it'] = mainData;

      // Get data for other supported languages
      supportedLanguages.forEach(lang => {
        if (lang.code !== 'it') {
          const { frontmatter: langFrontMatter, content: langContent } = getLangData(lang, file.inputPath);

          // Frontmatter merging: use deepMerge for merge the objects
          const mergedFrontmatter = deepMerge(baseFrontMatter, langFrontMatter);

          // Cleanup categories for specific language
          const langCategories = mergedFrontmatter.categories ? new Set(mergedFrontmatter.categories.map(cat => cat.trim())) : new Set();
          mergedFrontmatter.categories = Array.from(langCategories);

          // Cleanup tags for specific language
          const langTags = mergedFrontmatter.tags ? new Set(mergedFrontmatter.tags.map(tag => tag.trim())) : new Set();
          mergedFrontmatter.tags = Array.from(langTags);

          const langProjectData = {
            data: {
              ...mergedFrontmatter
            },
            url: `/${lang.code}/portfolio/${file.fileSlug}/`,
            lang: lang.code,
            content: langContent
          };

          // Add translation data to corresponding main project
          projects[file.fileSlug][lang.code] = langProjectData;
        }
      });
    });

    // Convert the object into an array for returning
    const projectsArray = Object.keys(projects).reduce((acc, fileSlug) => {
      return acc.concat(Object.values(projects[fileSlug]));
    }, []);

    return projectsArray.sort((a, b) => (a.data.title > b.data.title) ? 1 : -1);
  });

  // Filter by lang
  eleventyConfig.addCollection("allWithLang", function(collectionApi) {
    return collectionApi.getAll().filter(item => {
      // Only filter pages with eleventyNavigation
      if (item.data.eleventyNavigation) {
        // Add language from front matter to eleventyNavigation
        item.data.eleventyNavigation.lang = item.data.lang || "it"; // Default to 'it' if lang is not set
        return true;
      }
      return false;
    });
  });

  // Print language variants
  eleventyConfig.addCollection("languageVariants", function(collectionApi) {
    let languageVariants = {};

    collectionApi.getAll().forEach(item => {
      let fileSlug = item.fileSlug || '';
      let lang = item.data.lang;

      // Specific logic for special case: index
      if (item.inputPath.endsWith('src/index.njk')) {
        fileSlug = 'index';
      } else {
        // Check if inputPath ends with /index.njk for other languages
        supportedLanguages.forEach(language => {
          if (item.inputPath.endsWith(`src/${language.code}/index.njk`)) {
            fileSlug = 'index';
          }
        });
      }

      console.log(`Processing item: ${fileSlug} with language: ${lang}`);

      if (!languageVariants[fileSlug]) {
        languageVariants[fileSlug] = [];
      }

      supportedLanguages.forEach(language => {
        if (language.code !== lang) {
          let matchingItem = collectionApi.getAll().find(i =>
            ((i.fileSlug || (i.inputPath.endsWith('src/index.njk') ? 'index' : '')) === fileSlug) && i.data.lang === language.code
          );

          if (matchingItem) {
            console.log(`Found matching item for ${fileSlug} in language ${language.code}: ${matchingItem.url}`);
            languageVariants[fileSlug].push({
              url: matchingItem.url,
              lang: language
            });
          } else {
            console.log(`No matching item found for ${fileSlug} in language ${language.code}`);
          }
        }
      });

      // If an item for the language was not found, add current item for that language
      if (lang !== 'it' && languageVariants[fileSlug].every(variant => variant.lang.code !== lang)) {
        languageVariants[fileSlug].push({
          url: item.url,
          lang: { code: lang, name: supportedLanguages.find(l => l.code === lang).name }
        });
      }
    });

    console.log(`Final language variants: ${JSON.stringify(languageVariants, null, 2)}`);
    return languageVariants;
  });

  // Collection 'posts'
  eleventyConfig.addCollection('posts', collectionApi =>
    collectionApi.getFilteredByGlob('./src/collections/posts/*.md')
  );

  // Custom filters
eleventyConfig.addFilter('featured', function(collection, featured = true) {
  const currentLang = this.ctx.page?.lang;
  return collection.filter(item => 
    (!featured || item.data.featured) && (!currentLang || item.lang === currentLang)
  );
});


  eleventyConfig.addFilter('getAllCats', (projects, filterCats) => {
    const allCats = [];
    projects.forEach(project => {
      const projectCats = project.data.categories ? project.data.categories.map(cat => cat.trim()) : [];
      allCats.push(...projectCats);
    });
    const uniqueAllCats = [...new Set(allCats)];
    return filterCats.includes('all') ? uniqueAllCats : filterCats.filter(cat => uniqueAllCats.includes(cat));
  });

  // eleventyConfig.addNunjucksFilter('excludeFromCollection', (collection = [], pageUrl = this.ctx.page.url) =>
  //   collection.filter(post => post.url !== pageUrl)
  // );

  // eleventyConfig.addFilter('filterByTags', (collection = [], ...requiredTags) =>
  //   collection.filter(post => requiredTags.flat().every(tag => post.data.tags.includes(tag)))
  // );

  eleventyConfig.addNunjucksFilter('related', function(collection = []) {
  const { tags: requiredTags = [], page = {} } = this.ctx || {};
  return collection.filter(post =>
    post.url !== page.url &&
    post.lang === page.lang &&
    requiredTags.some(tag => post.data.tags.includes(tag))
  );
});







  // Eleventy debug configuration
  eleventyConfig.setUseGitIgnore(false); // Ignore the .gitignore file
  eleventyConfig.setWatchJavaScriptDependencies(false); // Don't consider JavaScript dependencies
  eleventyConfig.setTemplateFormats(['html', 'md', 'njk']); // Template formats to consider

  // Only debug in development mode
  if (process.env.NODE_ENV === 'development') {
    eleventyConfig.setQuietMode(false); // Disable quiet mode
    eleventyConfig.setBrowserSyncConfig({
      logLevel: 'debug',
      open: true
    });
  }

  // More code here

};