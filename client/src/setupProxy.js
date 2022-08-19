const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', //5000번 포트가 server 포트이므로 5000을 준다.
      changeOrigin: true,
    })
  );
};