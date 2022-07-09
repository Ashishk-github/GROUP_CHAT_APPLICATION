const express=require('express');
const chatController=require('../controller/chat');
const auth=require('../controller/authenticator');
const router=express.Router();

router.get('/chat/:id',auth,chatController.getChats);

router.post('/chat',auth,chatController.postChat);

module.exports=router;