const userSchema = require("../model/userModel");
const bcrypt=require('bcrypt')



//user register

const registerUser = async (req, res) => {
  try {
    // console.log("entering the register user controller");
    const { email, password } = req.body;
  

    // console.log("email:", email);

    // console.log("password:", password);

    const user = await userSchema.findOne({ email });
    if (user)
      return res.render("user/login");
    const hashPassword=await bcrypt.hash(password,10)

    const newUser = new userSchema({
      email,
      password:hashPassword,
    });

    await newUser.save();
    res.redirect('/');
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

    if (!user)

      return res.render("user/login");

   let isMatch= await bcrypt.compare(password,user.password)

   console.log(isMatch);
    //incorrect password//
    if (!isMatch){
      
      return res.render("user/login");
    }
      
      
      
        req.session.isAuth = true;
        req.session.user = user.email;
        
      res.redirect("/home");
  } catch (error) {}
};





const forgetPassword=async (req,res) => {
  try {
    
   const {email,password} =req.body
   console.log(email,password);

    const user= await userSchema.findOne({email})

    if(user){
      user.password= await bcrypt.hash(password,10)
      await user.save()
    }else{
      console.log("invalid user");
    }

    res.redirect('/')

  } catch (error) {
    
  }
  
}



//user routing

const loadRegister = async (req, res) => {
  try{
    res.render("user/login");

  }catch (error){
    console.log("error occured while user register");
  }
};

const loadLogin = async (req, res) => {
  try{
    if(req.session.isAuth){
      
      res.redirect('/home')
    }
    
    else{
      
      res.render("user/login");
    }

  }catch (error){
    console.log("error occured while rendering login page");
  }
};

const loadHome = async (req, res) => {
  try {
    if(req.session.isAuth){
      console.log("user enterd");
      console.log(req.session.user);
      res.render("user/home",{user:req.session.user});

    }
  } catch (error) {
    console.log("error occured while rendering the home page", error);
  }
};


const loadForget=async (req,res) => {
  try {
    res.render('user/forget')
  } catch (error) {
    
  }
  
}

const logout = async (req,res) => {
  try {
    req.session.destroy()
    res.redirect('/')
  } catch (error) {
    console.log('error occured while user logging out',error);
  }
}


//module exports


module.exports = {
  registerUser,
  loadLogin,
  loadRegister,
  loadHome,
  login,
  logout,
  forgetPassword,
  loadForget
};
