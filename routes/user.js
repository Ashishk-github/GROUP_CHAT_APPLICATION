const express=require('express');
const chatController=require('../controller/chat');
const mediaController=require('../services/aws-s3');
const auth=require('../controller/authenticator');
const router=express.Router();

router.get('/chat/:id',auth,chatController.getChats);

router.post('/chat',auth,chatController.postChat);

// router.use('/media',auth,mediaController.postMedia);

module.exports=router;