module.exports = (eleventyConfig) => {
  eleventyConfig.addCollection('jobs', (collectionApi) => {
    return collectionApi.getFilteredByGlob('src/collections/jobs/**/*.md')
  })
  eleventyConfig.addCollection('posts', (collectionApi) => {
    return collectionApi.getFilteredByGlob('src/collections/posts/**/*.md')
  })
  eleventyConfig.addCollection('projects', (collectionApi) => {
    return collectionApi.getFilteredByGlob('src/collections/projects/**/*.md')
    .sort((a, b) => {
    if (b.data.title > a.data.title) return -1
    else if (b.data.title < a.data.title) return 1
    else return 0
    })
  })
  eleventyConfig.addCollection('talks', (collectionApi) => {
    return collectionApi.getFilteredByGlob('src/collections/talks/**/*.md')
  })
  // Filters
  eleventyConfig.addFilter('featured', (collection, featured = true) => {
  if (!featured) return collection
    const filtered = collection.filter(item => item.data.featured == true)
    return filtered
  })
  eleventyConfig.addFilter('getAllCats', (projects, filterCats) => {
    const allCats = []
    projects.forEach(project => {
      const projectCats = project.data.categories.map(cat => cat.trim())
      allCats.push(...projectCats)
    })
    const uniqueAllCats = [...new Set(allCats)]
    if (filterCats.includes('all')) {
      return uniqueAllCats
    } else {
      return filterCats.filter(cat => uniqueAllCats.includes(cat))
    }
  })
  eleventyConfig.addNunjucksFilter('excludeFromCollection', (collection = [], pageUrl = this.ctx.page.url) => {
    return collection.filter(post => post.url !== pageUrl)
  })
  eleventyConfig.addFilter('filterByTags', (collection = [], ...requiredTags) => {
    return collection.filter(post => {
      return requiredTags.flat().every(tag => post.data.tags?.includes(tag))
    })
  })
  eleventyConfig.addNunjucksFilter('related', function (collection = []) {
    const { tags: requiredTags, page } = this.ctx
    return collection.filter(post => {
      return post.url !== page.url && requiredTags?.some(tag => post.data.tags?.includes(tag))
    })
  })
}
