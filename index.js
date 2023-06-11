const express = require('express');
const cors = require('cors')
require("./database/conn");
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const port = 5000; // server port
//ROUTES IMPORT
const SignInRouter = require('./routes/loginRoute/loginRoute');
const StudentRegRouter = require('./routes/signUpRoute/studentRegRoute');
const ForgotPassRouter = require('./routes/forgot-password/forgotPassword');
const LibrarianRegRouter = require('./routes/signUpRoute/librarianRegRoute');
const AdminRegRouter = require('./routes/signUpRoute/adminRegRoute');
const QrCodeRouter = require('./routes/qrCodeRoute/qrCodeRoute');
const AddBookRouter = require('./routes/bookRoute/addBookRoute');
const GetBookRouter = require('./routes/bookRoute/getBookRoute');

// ROUTES
app.use(SignInRouter);
app.use(ForgotPassRouter);
app.use(StudentRegRouter);
app.use(LibrarianRegRouter);
app.use(AdminRegRouter);
app.use(QrCodeRouter);
app.use(AddBookRouter);
app.use(GetBookRouter);

app.use("/uploads", express.static("./uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
