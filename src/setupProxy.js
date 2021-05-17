const { createProxyMiddleware } = require("http-proxy-middleware")

// 「http://localhost:3000/.netlify/functions/」へのリクエストを「http://localhost:9000/.netlify/functions/」へ代替し、CORSを有効にする。

module.exports = function(app) {
  app.use(
    "/.netlify/functions/",
    createProxyMiddleware({
      target: "http://localhost:9000",
      changeOrigin: true
    })
  )
}
