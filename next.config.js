/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      //接口请求 前缀带上/api-text/
      { source: '/api-text/:path*', destination: `https://4w2cn9zhuf.execute-api.ap-northeast-3.amazonaws.com/api/:path*` },

    ]
  },
}

