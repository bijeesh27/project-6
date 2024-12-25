const express = require("express");
const session = require("express-session");
const nocache = require("nocache");
const path = require("path");
const app = express();
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin');
const connectDB = require("./db/connectDB");
const flash=require('connect-flash')


app.use(flash())


app.use(nocache())

app.set("view engine", "ejs");

app.set("views", "./views");

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use('/',userRoutes)
app.use('/admin',adminRoutes)


connectDB();

app.listen(3001, () => {
  console.log(`http://localhost:3001`);
});