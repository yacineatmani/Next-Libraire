const nextConfig = {
  images: {
    domains: ['images.gr-assets.com'],
    unoptimized: true, // Si tu n'avais pas ce paramètre avant, retire-le
  },
};
// next.config.js
const isGithubPages = process.env.GITHUB_ACTIONS || false;

module.exports = {
  output: 'export',
  basePath: isGithubPages ? '/Next-Libraire' : '',
  trailingSlash: true,
};


module.exports = nextConfig;
