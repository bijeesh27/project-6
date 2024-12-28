const userSchema = require("../model/userModel");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

//user register

const registerUser = async (req, res) => {
  try {
    // console.log("entering the register user controller");
    const { email, password } = req.body;

    // console.log("email:", email);

    // console.log("password:", password);

    const user = await userSchema.findOne({ email });
    if (user) {
      req.flash("error", "User Already Exists");
      return res.redirect("/");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userSchema({
      email,
      password: hashPassword,
    });

    await newUser.save();
    req.flash("success", "Successfully Registered");
    res.redirect("/");
  } catch (error) {
    console.log("error occured while rendering the login page", error);
  }
};

//checking user validation

const login = async (req, res) => {
  try {
    console.log("entering the post login method");
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });

    if (!user) {
      req.flash("error", "No User Found");
      return res.redirect("/");
    }

    let isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch);
    //incorrect password//
    if (!isMatch) {
      req.flash("error", "Incorrect Password");
      return res.redirect("/");
    }

    req.session.isAuth = true;
    req.session.user = user.email;

    res.redirect("/home");
  } catch (error) {}
};

const forgetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await userSchema.findOne({ email });

    if (user) {
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      req.flash("success", "Password Change Successfully");
      res.redirect("/");
    } else {
      console.log("invalid user");
      req.flash("error", "User Doesn't Exists");
      res.redirect("/");
    }
  } catch (error) {}
};

//user routing

const loadRegister = async (req, res) => {
  try {
    res.render("user/login");
  } catch (error) {
    console.log("error occured while user register");
  }
};

const loadLogin = async (req, res) => {
  try {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    if (req.session.isAuth) {
      res.redirect("/home");
    } else {
      res.render("user/login", { successMessage, errorMessage });
    }
  } catch (error) {
    console.log("error occured while rendering login page");
  }
};

const loadHome = async (req, res) => {
  try {
    if (req.session.isAuth) {
      console.log("user enterd");
      console.log(req.session.user);
      res.render("user/home", { user: req.session.user });
    }
  } catch (error) {
    console.log("error occured while rendering the home page", error);
  }
};

const loadForget = async (req, res) => {
  try {
    res.render("user/forget");
  } catch (error) {}
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log("error occured while user logging out", error);
  }
};

//module exports

module.exports = {
  registerUser,
  loadLogin,
  loadRegister,
  loadHome,
  login,
  logout,
  forgetPassword,
  loadForget,
};
