
import { createProxyMiddleware } from 'http-proxy-middleware';
const target = "https://4w2cn9zhuf.execute-api.ap-northeast-3.amazonaws.com/api"
console.log("asdasd", target);
export default createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: {
        '/api': '/',
    },
    prependPath: true,
});
