const express=require('express');
const adminController=require('../controller/admin');
const auth=require('../controller/authenticator');
const router=express.Router();

router.post('/addmember',auth,adminController.addMembers);

router.post('/removemember',auth,adminController.removeMembers);

module.exports=router;