
import { createProxyMiddleware } from 'http-proxy-middleware';

console.log("asdasd", process.env.FIREBASE_API_DOMAIN);
export default createProxyMiddleware({
    target: process.env.FIREBASE_API_DOMAIN,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/',
    },
    prependPath: true,
});
