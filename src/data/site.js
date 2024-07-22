var environment = process.env.ELEVENTY_ENV || 'production'
if (environment === 'development') {
  var url = '/'
} else {
  var url = 'https://www.raffaellarinaldi.dev/'
}

module.exports = () => {
  return {
    environment: process.env.ELEVENTY_ENV,
    title: 'Raffaella Rinaldi',
    subtitle: 'Online Presence Specialist',
    description: 'Sono un\'esperta specialista della presenza online con competenze nello sviluppo di siti web, automazione del marketing e social media. Vuoi sapere come posso contribuire al tuo progetto? Consulta il mio portfolio e curriculum.',
    url: url,
    lang: 'it',
    locale: 'it_IT',
    email: 'ciao@raffaellarinaldi.dev',
    short: {
      title: 'R.Rinaldi',
      subtitle: 'O.P.S.'
    },
    phone: {
      land: '',
      mobile: '393780650930',
      fax: '',
    },
    address: '',
    network: [
      {
        name: 'linkedin',
        link: 'https://linkedin.com/in/raffaellainesrinaldi',
        icon: 'linkedin-in',
      },
      {
        name: 'github',
        link: 'https://github.com/raffaellarinaldi',
        icon: 'github-alt',
      },
      // { name: 'instagram', link: 'https://instagram.com/raffaellarinaldi.dev', icon: 'instagram' },
      // { name: 'upwork', link: '#', icon: 'upwork' },
      // { name: 'stack-overflow', link: 'https://stackoverflow.com/users/7126390/raffaella', icon: 'stack-overflow' },
      // { name: 'codepen', link: 'https://codepen.io/raffaellarinaldi', icon: 'codepen' },
      // { name: 'medium', link: '#', icon: 'medium-m' },
      // { name: 'facebook', link: '#', icon: 'facebook-f' },
      // { name: 'twitter', link: '#', icon: 'twitter' }
    ]
  }
}
