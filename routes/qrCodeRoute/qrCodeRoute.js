const express = require("express");
const QrCodeRouter = new express.Router();
const QRCode = require("qrcode");

QrCodeRouter.post("/librarian/scannerQrCode", async (req, res) => {
  const detail = req.body.detail;
  if (detail.length === 0) {
    return res.status(404).json({ message: "Empty Data" });
  }

  QRCode.toDataURL(detail, function (err, detail) {
    console.log(detail);
    res.send(detail);
  });
});

module.exports = QrCodeRouter;
