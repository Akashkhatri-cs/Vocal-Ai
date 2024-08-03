// pages/api/proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware({
  target: 'http://100.24.60.64', // Replace this with your AWS ECS backend IP or URL
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '', // This removes '/api/proxy' from the request URL
  },
});

export default function handler(req, res) {
  return apiProxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
    return result;
  });
}
