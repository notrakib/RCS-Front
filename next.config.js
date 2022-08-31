/** @type {import('next').NextConfig} */
exports.nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  env: {
    URL: "https://realistic-cart-system.herokuapp.com",
    // URL: "http://localhost:8080",
  },
};
