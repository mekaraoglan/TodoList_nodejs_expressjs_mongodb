const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cookieParser = require('cookie-parser');
const authenticateToken = require("./middlewares/authenticateToken");

//db connect
const connectDb = require("./db/dbConnect");
const port = process.env.PORT || 3001;
connectDb();

app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'public')));

//Template Engine
app.set("view engine", "ejs");

//Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authenticateToken); // Check login

//Routes
const indexRouter = require("./routes/indexRoute");
const authRouter = require("./routes/authRoute");
const taskRouter = require("./routes/taskRoute");
const userRouter = require("./routes/userRoute");

app.use("/auth", authRouter);
app.use(indexRouter);
app.use(taskRouter);
app.use(userRouter);


app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor.`);
})