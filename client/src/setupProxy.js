const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/student/login",
      "/student/valid",
      "/student/logout",
      "/student/register",
      "/admin",
      "/librarian",
      "/uploads",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
