const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/student/login",
      "/student/valid",
      "/student/logout",
      "/student/register",
      "/student/pending",
      "/student/forgot-password",
      "/student/get-info",
      "/librarian/forgot-password",
      "/librarian/accounts",
      "/librarian/scannerQrCode",
      "/admin/forgot-password",
      "/admin/accounts",
      "/book/single-add",
      "/book/batch-add",
      "/book/get-new",
      "/student/approve",
      "/book/get-genre",
      "/book/get-all-book-per-genre",
      "/book/get-available",
      "/book-delete-available", // new
      "/book-update-available", // new
      "/book-update-review", // new
      "/book/add-shelf",
      "/book/get-info",
      "/book/get-borrowed",
      "/book/student-borrowed",
      "/book/student-shelf",
      "/book/get-reserved",
      "/book/add-borrowed",
      "/book/add-reserved",
      "/book/student-currently-borrowed",
      "/book/all-currently-borrowed",
      "/book/student-recently-borrowed",
      "/book/all-recently-borrowed",
      "/book/process-lost",
      "/book/process-return",
      "/book/get-lost",
      "/book/get-all-lost",
      "/book/get-all-review",
      "/report/generate",
      "/report/get-generated",
      "/report/download-csv",
      "/book-rate",
      "/book",
      "/admin",
      "/librarian",
      "/uploads",
      "/file-uploads",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
