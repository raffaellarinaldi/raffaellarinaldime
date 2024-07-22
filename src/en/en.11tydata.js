module.exports = () => {
  return {
    'site': {
      'description': 'I\'m a proficient online presence specialist with expertise in website development, marketing automation and social media. Want to know how I may help your project? Check out my project case studies and resume.',
      'lang': 'en',
      'locale': 'en_US',
      'email': 'hello@raffaellarinaldi.dev'
    },
    lang: 'en',
    permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/${data.lang}/${this.slugify(data.slugOverride)}/`;
    }
  }
  }
}
