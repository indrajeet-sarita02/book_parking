/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sequelize', 'pg'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('pg', 'sequelize');
    }
    return config;
  },
};

export default nextConfig;
