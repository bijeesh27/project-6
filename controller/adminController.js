const userSchema=require('../model/userModel')



const addUser=async (req,res) => {
    try {
        
        const {email,password} =req.body
        const user =  await userSchema.findOne({email})
        if (user) return res.render("admin/dashboard");
        
            const newUser = new userSchema({
              email,
              password,
            });
        
            await newUser.save();
            console.log(newUser);
            res.redirect('/admin/dashboard');
          } catch (error) {
            console.log("error occured while rendering the login page", error);
          }
   
}

const editUser=async (req,res) => {
  try {
    
    const {email,password}=req.body

    const userId = req.params.id;
    console.log('userId:',userId);

    const user=await userSchema.findById(userId)


    if(user){
      user.email=email,
       user.password=password
       await user.save()
       res.redirect('/admin/dashboard')
    }else{

    }

  } catch (error) {
    
  }
  
}

const deleteUser=async (req,res) => {
  try {
    const userId=req.params.id
    console.log(userId);

    const deleteUser=await userSchema.findByIdAndDelete(userId)

    console.log("delete fuction");
    res.redirect('/admin/dashboard')


  } catch (error) {
    
  }
  
}




const admin= async (req, res) => {
    try {
      console.log("entering the post adlogin method");
      console.log(req.body);
      const { email, password } = req.body;
      const admin = await userSchema.findOne({ email });
       console.log(admin);
      if (!admin)
  
        return res.render("admin/login");
  
     
      //incorrect password//
      if (admin.password !== password){
        
        return res.render("admin/login");
      }
      if(!admin.isAdmin){
          return res.render('admin/login')
        }
       
        
        
        
          req.session.isAdauth = true;
          req.session.admin = admin.email;


          
        res.redirect('/admin/dashboard');
    } catch (error) {}
  };


  const loadDashboard=async (req,res) => {
    try {
        if(req.session.isAdauth){
            let users = await userSchema.find({isAdmin:false}).sort({created_At:-1});
            res.render('admin/dashboard',{users:users})
        }
        else{
            res.redirect('/admin')





        }
    } catch (error) {
        console.log("error ocuured while admin is login");
    }
    
  }



const loadLogin=async (req,res) => {
    try {
        if(!req.session.isAdauth){
            
            res.render('admin/login')
        }
        else{
            res.redirect('/admin/dashboard')
        }
    } catch (error) {
        
    }
    
}

const logout=async (req,res) => {
    try {
        req.session.destroy()
        res.redirect('/admin')
        
    } catch (error) {
        
    }
    
}




module.exports={
    loadLogin,
    admin,
    loadDashboard,
    logout,
    addUser,
    editUser,
    deleteUser
}