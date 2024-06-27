module.exports = (eleventyConfig) => {
  // Shortcodes
    eleventyConfig.addPairedNunjucksShortcode('row', (content, title) => {
    return `
    <div class="section-row">
      <h3 class="section-title">${title}</h3>
      ${content}
    </div>
    `
  })
  eleventyConfig.addNunjucksShortcode('youtube', (title, id) => {
    return `
    <h4 class="mb-3">${title}</h4>
      <div class="ratio ratio-16x9 mb-5">
        <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/${id}?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    `
  })
  eleventyConfig.addNunjucksShortcode('tweet', (quote, author, title, username, id, date) => {
    return `
    <div class="mb-5 text-center">
      <blockquote class="twitter-tweet" data-lang="en">
        <p lang="en" dir="ltr">&quot;${quote}.&quot; - ${author}</p>
        &mdash; ${title} (@${username}) <a href="https://twitter.com/CodeWisdom/status/${id}?ref_src=twsrc%5Etfw">${date}</a>
        </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
		</div>
    `
  })
  eleventyConfig.addNunjucksShortcode('alert', (content) => {
    return `
    <div class="alert bg-white shadow-sm mb-4">
      ${content}
		</div>
    `
  })
  eleventyConfig.addNunjucksShortcode('figure', (path, caption) => {
    return `
    <figure class="figure mb-5">
      <img class="img-fluid figure-img" src="${path}">
      <figcaption class="figure-caption text-center">${caption}</figcaption>
    </figure>
    `
  })
  eleventyConfig.addPairedNunjucksShortcode('code', (content, title, type='') => {
    return `
    <h4 class="mb-3">${title}</h4>
    <div class="mb-5">
      <pre>
        <code class="${type.toLowerCase()}">
            ${content}
        </code>
      </pre>
    </div>
    `
  })
}
