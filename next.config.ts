const isGithubPages = process.env.GITHUB_ACTIONS || false;

const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? '/Next-Libraire' : '',
  trailingSlash: true,
  images: {
    domains: ['images.gr-assets.com'],
    unoptimized: true,
  },
};

export default nextConfig;
