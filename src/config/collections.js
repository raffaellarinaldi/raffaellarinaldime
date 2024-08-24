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

      // Extract fileSlug from file inputPath
      const fileSlug = path.basename(file.inputPath, path.extname(file.inputPath));

      // Main data for Italian version
      const mainData = {
        data: {
          ...baseFrontMatter
        },
        url: `/portfolio/${fileSlug}/`,
        lang: 'it',
        content: baseContentWithoutFrontmatter,
        fileSlug: fileSlug // Add fileSlug here
      };

      // Initialize empty object for translations
      projects[fileSlug] = {};

      // Add data for Italian version
      projects[fileSlug]['it'] = mainData;

      // Get data for other supported languages
      supportedLanguages.forEach(lang => {
        if (lang.code !== 'it') {
          const { frontmatter: langFrontMatter, content: langContent } = getLangData(lang, file.inputPath);

          // Frontmatter merging: use deepMerge to merge the objects
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
            url: `/${lang.code}/portfolio/${fileSlug}/`,
            lang: lang.code,
            content: langContent,
            fileSlug: fileSlug // Add fileSlug here
          };

          // Add translation data to corresponding main project
          projects[fileSlug][lang.code] = langProjectData;
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

  // Function to get tags
  function getTags(post, collection) {
    if (post.data.tags) {
      return post.data.tags;
    }

    // Trova la versione principale dello stesso post
    const mainPost = collection.find(p => p.fileSlug === post.fileSlug && p.lang === 'it');
    return mainPost ? mainPost.data.tags || [] : [];
  }

  // Nunjucks filter for related posts
  eleventyConfig.addNunjucksFilter('related', function(collection = [], page) {
    // Verifica che la pagina sia definita e contiene un fileSlug
    if (!page || !page.fileSlug) {
        return [];
    }

    // Ottieni la collezione passata e trova l'elemento corrispondente alla pagina
    const collectionItems = collection;
    const currentItem = collectionItems.find(item => item.fileSlug === page.fileSlug);

    if (!currentItem) {
        console.log('Current item not found in collection');
        return [];
    }

    // Recupera i tag dall'elemento corrente
    const requiredTags = currentItem.data.tags || [];
    const currentLang = page.lang || 'it';

    // Normalizza i tag per il confronto
    const normalizedRequiredTags = requiredTags.map(tag => tag.trim().toLowerCase());

    return collectionItems.filter(item => {
        // Verifica che l'elemento abbia i tag
        if (!item || !item.data || !item.data.tags) {
            return false;
        }

        // Normalizza i tag degli elementi
        const itemTags = (item.data.tags || []).map(tag => tag.trim().toLowerCase());

        // Verifica la corrispondenza dei tag
        const isTagMatch = normalizedRequiredTags.some(tag => itemTags.includes(tag));

        // Verifica la corrispondenza della lingua
        const isLangMatch = item.lang && item.lang.trim().toLowerCase() === currentLang.trim().toLowerCase();

        // Debugging: Mostra le informazioni di confronto per ogni elemento
        console.log(`Checking item: ${item.url}`);
        console.log(`Tags: ${itemTags.join(', ')}`);
        console.log(`Is Tag Match: ${isTagMatch}`);
        console.log(`Is Language Match: ${isLangMatch}`);

        // Restituisce true solo se entrambe le condizioni sono soddisfatte e l'elemento non è la pagina corrente
        return item.url !== page.url && isTagMatch && isLangMatch;
    });
});



  // More code here
};