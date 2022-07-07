const express=require('express');
const signController=require('../controller/sign');
const router=express.Router();

router.post('/signup',signController.signup);

router.post('/login',signController.login);

module.exports=router;