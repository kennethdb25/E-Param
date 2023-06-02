const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/student/login",
      "/student/valid",
      "/student/logout",
      "/admin",
      "/librarian",
      "/uploads",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
