module.exports = () => {
  return {
    'site': {
      'description': 'Sono una specialista esperta nella gestione della presenza online con competenze nello sviluppo di siti web, nell\'automazione del marketing e nei social media. Vuoi sapere come posso contribuire al tuo progetto? Consulta i miei casi studio e il mio curriculum.',
      'lang': 'it',
      'locale': 'it_IT',
      'email': 'ciao@raffaellarinaldi.dev'
    },
    lang: 'it',
    permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/${this.slugify(data.slugOverride)}/`;
    }
  }
  }
}
