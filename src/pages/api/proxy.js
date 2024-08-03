// pages/api/proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware({
  target: 'http://44.203.216.52', // Replace this with your AWS ECS backend IP or URL
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '', // This removes '/api/proxy' from the request URL
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      // Ensure the correct Content-Type header is set
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // Write out body changes to the proxyReq stream
      proxyReq.write(bodyData);
    }
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
