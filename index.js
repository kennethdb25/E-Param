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
const LibrarianRegRouter = require('./routes/signUpRoute/librarianRegRoute');
const AdminRegRouter = require('./routes/signUpRoute/adminRegRoute');

// ROUTES
app.use(SignInRouter);
app.use(StudentRegRouter);
app.use(LibrarianRegRouter);
app.use(AdminRegRouter);

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
