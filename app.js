const express = require("express");
const session = require("express-session");
const nocache = require("nocache");
const path = require("path");
const app = express();
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin');
const connectDB = require("./db/connectDB");




app.set("view engine", "ejs");

app.set("views", "./views");

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(nocache())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use('/',userRoutes)
app.use('/admin',adminRoutes)











connectDB();

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});