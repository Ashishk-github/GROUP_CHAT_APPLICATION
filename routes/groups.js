const express=require('express');
const groupController=require('../controller/group');
const auth=require('../controller/authenticator');
const router=express.Router();

router.post('/creategroup',auth,groupController.create);

router.get('/mygroups',auth,groupController.showGroups);

module.exports=router;
