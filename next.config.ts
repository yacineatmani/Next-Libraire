/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Next-Libraire',
  assetPrefix: '/Next-Libraire/',
  images: {
    domains: ['images.gr-assets.com'], // Conserver votre domaine
    unoptimized: true, // Nécessaire pour l'export statique
  },
  // Autres options de configuration si nécessaire
};

// Utiliser module.exports au lieu de export default pour la compatibilité
module.exports = nextConfig;