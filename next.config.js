// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
//   async rewrites() {
//     return [
//       //接口请求 前缀带上/api-text/
//       { source: '/backend/:path*', destination: `https://4w2cn9zhuf.execute-api.ap-northeast-3.amazonaws.com/api/:path*` },
//
//     ]
//   },
// }
//

// next.config.js
module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

