/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "cdn.pixabay.com", 
      "gofield.s3.ap-northeast-2.amazonaws.com",
      "d22b51gh5o1q1e.cloudfront.net",
    ],
  },
};

module.exports = nextConfig
