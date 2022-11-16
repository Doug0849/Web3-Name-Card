/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ENABLE_TESTNETS: "true", // 新增環境變數
  }
};

module.exports = nextConfig;
