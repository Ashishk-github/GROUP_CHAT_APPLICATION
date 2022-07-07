const express=require('express');
const chatController=require('../controller/chat');
const auth=require('../controller/authenticator');
const router=express.Router();

router.get('/chats',auth,chatController.getChats);

// router.post('/login',signController.login);

module.exports=router;