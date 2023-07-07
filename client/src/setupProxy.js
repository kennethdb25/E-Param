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
      "/book-delete-available",
      "/book-update-available",
      "/book-update-review",
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
      "/book-graph-ratings",
      "/book-borrowed-ratings",
      "/report/generate",
      "/report/get-generated",
      "/report/download-csv",
      "/add-attendance",
      "/get-attendance",
      "/add-announcement",
      "/get-announcement",
      "/change-status-announcement",
      "/get-active-announcement",
      "/add-section",
      "/get-section",
      "/get-all-section",
      "/change-status-section",
      "/book/borrowed/push-notification",
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
