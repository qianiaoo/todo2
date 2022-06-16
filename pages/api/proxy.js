// // 该服务为 vercel serve跨域处理
// const { createProxyMiddleware } = require('http-proxy-middleware')
//
// module.exports = (req, res) => {
//     let target = 'https://4w2cn9zhuf.execute-api.ap-northeast-3.amazonaws.com/api/'
//
//     // 代理目标地址
//     // xxxxx 替换为你跨域请求的服务器 如： http://baidu.com
//     if (req.url.startsWith('/api')) {
//         // 这里填目标地址
//         target = 'https://4w2cn9zhuf.execute-api.ap-northeast-3.amazonaws.com/api/'
//     }
//     // 创建代理对象并转发请求
//     createProxyMiddleware({
//         target,
//         changeOrigin: true,
//         pathRewrite: {
//             // 通过路径重写，去除请求路径中的 `/api`
//             // 例如 /api/user/login 将被转发到 http://target/user/login
//             '^/api/': '/'
//         }
//     })(req, res)
// }
//
//
const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const API_URL = process.env.API_URL || 'https://4w2cn9zhuf.execute-api.ap-northeast-3.amazonaws.com/api/'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express();

    server.use(
        '/api',
        createProxyMiddleware({
            target: API_URL,
            pathRewrite: {
                "^/api": ""
            },
            changeOrigin: true
        })
    );

    server.all('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    });
});
