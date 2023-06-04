const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/student/login",
      "/student/valid",
      "/student/logout",
      "/student/register",
      "/student/forgot-password",
      "/librarian/forgot-password",
      "/admin/forgot-password",
      "/admin",
      "/librarian",
      "/uploads",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
