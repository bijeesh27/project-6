const express=require('express')
const router=express.Router();
const userController=require('../controller/userController')


router.get('/',userController.loadLogin)

router.post('/login',userController.login)

router.get('/register',userController.loadRegister)

router.post('/register',userController.registerUser)

router.get('/home',userController.loadHome)

router.get('/logout',userController.logout)

router.get('/forget',userController.loadForget)

router.post('/forget',userController.forgetPassword)

router.get('/forget',userController.loadForget)

module.exports=router