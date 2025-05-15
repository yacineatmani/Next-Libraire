const isGithubPages = process.env.GITHUB_ACTIONS || false;

const nextConfig = {
  images: {
    domains: ['images.gr-assets.com'],
    unoptimized: true,
  },
  output: 'export',
  basePath: isGithubPages ? '/Next-Libraire' : '',
  trailingSlash: true,
};

export default nextConfig;
