var environment = process.env.ELEVENTY_ENV || 'production'
if ( environment === 'development' ) {
	var url = '/'
} else {
	var url = 'https://raffaella.dev/'
}

module.exports = () => {
  return {
    // Main data
    environment: process.env.ELEVENTY_ENV,
    title: 'Raffaella Rinaldi',
    slogan: 'Online Presence Specialist',
    description: 'I\'m a proficient online presence specialist with expertise in website development, marketing automation and social media. Want to know how I may help your project? Check out my project case studies and resume.',
    url: url,
    email: 'info@raffaellarinaldi.com',
    phone: {
      land: '',
      mobile: '393780650930',
      fax: ''
    },
    address: '',
    network: [
      { name: 'linkedin', link: 'https://linkedin.com/in/raffaellainesrinaldi', icon: 'linkedin-in' },
      { name: 'github', link: 'https://github.com/raffaellarinaldi', icon: 'github-alt' },
      //{ name: 'instagram', link: 'https://instagram.com/raffaellarinaldi.av', icon: 'instagram' },
      //{ name: 'upwork', link: '#', icon: 'upwork' },
      // { name: 'stack-overflow', link: 'https://stackoverflow.com/users/7126390/raffaella', icon: 'stack-overflow' },
      // { name: 'codepen', link: 'https://codepen.io/raffaellarinaldi', icon: 'codepen' },
      // { name: 'medium', link: '#', icon: 'medium-m' },
      // { name: 'facebook', link: '#', icon: 'facebook-f' },
      // { name: 'twitter', link: '#', icon: 'twitter' }
    ],
    // Skills
    skills: [
      {
        title: 'Web Development',
        skills: [
          { name: 'Content Management Systems', percentage: '74' },
          { name: 'Static Site Generators', percentage: '68' },
          { name: 'Website Builders', percentage: '63' },
          { name: 'NoCode Platforms', percentage: '50' },
          { name: 'Search Engine Optimization', percentage: '75' }
        ]
      },
      {
        title: 'Marketing Automation',
        skills: [
          { name: 'Customer Relationship Management', percentage: '61' },
          { name: 'Direct Email Marketing', percentage: '77' },
          { name: 'Sales Funnel Strategy', percentage: '60' },
          { name: 'Omnichannel Retargeting', percentage: '50' },
          { name: 'Analytics & Reporting', percentage: '50' },
        ]
      },
      {
        title: 'Social Media',
        skills: [
          { name: 'Community Management', percentage: '81' },
          { name: 'Paid Digital Ads', percentage: '65' },
          { name: 'Networking Outreach', percentage: '76' },
          { name: 'Content Writing', percentage: '85' },
          { name: 'Profile & Page Optimization', percentage: '78' }
        ]
      }
    ],
    // Tools
    tools: [
      { name: 'Canva', link: '#' },
      { name: 'Buffer', link: '#' },
      { name: 'Trello', link: '#' },
      { name: 'Bitwarden', link: '#' },
      { name: 'Zapier', link: '#' }
    ],
    // Education
    education: [
      { degree: 'Diploma in Accounting', org: 'ITC Giacomo Antonietti', time: '1998 - 2003' },
      { degree: 'Degree in Foreign Languages', org: 'Università Cattolica del Sacro Cuore', time: '2004 - 2012' }
    ],
    // Coures (ex-Awards)
    courses: [
      { name: 'The Complete 2024 Web Development Bootcamp', desc: 'Udemy' },
      { name: 'The Complete Digital Marketing Guide - 24 Courses in 1', desc: 'Udemy' },
      { name: 'Digital Marketing B2B: Dekker\'s Ultimate Digital Marketing', desc: 'Udemy' }
    ],
    // Languages
    languages: [
      { name: 'Italian', level: 'Native' },
      { name: 'English', level: 'Professional' },
      { name: 'French', level: 'Elementary' },
    ],
    // Interests
    interests: ['Reading', 'Writing', 'Cooking', 'Dancing', 'Trekking'],
  }
}
