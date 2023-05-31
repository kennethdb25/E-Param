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

// ROUTES
app.use(StudentRegRouter);
app.use(SignInRouter);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
