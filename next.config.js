const path = require('path');

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
  sassOptions: {
    // includePaths: [path.join(__dirname, 'src/styles/common')],
    prependData: `@import "src/styles/common/common.scss";`, // common.scss 에 선언한 scss 변수를 모든 scss 파일에서 사용 가능!
  },
};

module.exports = nextConfig
