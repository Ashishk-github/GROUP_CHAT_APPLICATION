const express=require('express');
const adminController=require('../controller/admin');
const auth=require('../controller/authenticator');
const router=express.Router();

router.post('/addmembers',auth,adminController.addMembers);

// router.post('/signup',signController.signup);

module.exports=router;