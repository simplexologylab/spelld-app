module.exports = {
  siteMetadata: {
    title: `spelld.it`,
    description: `The worlds best spelling test app!`,
    author: `@ramseytisher`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Droid Sans', 'Droid Serif']
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `spelld.it`,
        short_name: `spelld.it`,
        start_url: `/`,
        background_color: `#1d6cd2`,
        theme_color: `#1d6cd2`,
        display: `fullscreen`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
