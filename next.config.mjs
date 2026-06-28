/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sequelize', 'sqlite3', 'mysql2'],
  },
};

export default nextConfig;
