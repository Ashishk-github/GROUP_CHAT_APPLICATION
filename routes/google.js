const express=require('express');
const googleController=require('../controller/google');
const router=express.Router();
const passport = require('passport');
require('../controller/passport');

// const passport = require('passport');
const cookieSession = require('cookie-session');

router.use(cookieSession({
	name: 'google-auth-session',
	keys: ['key1', 'key2']
}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/callback/success' , (req , res,next) => {
	if(!req.user)
		res.redirect('/callback/failure');
	next();
},googleController.token);

router.get('/callback/failure' , (req , res) => {
	res.send("Error");
})

router.get( '/callback',
	passport.authenticate( 'google', {
		successRedirect: '/auth/callback/success',
		failureRedirect: '/auth/callback/failure'
}));

router.get('/',passport.authenticate('google', { scope:
	[ 'email', 'profile' ]
}));




module.exports=router;