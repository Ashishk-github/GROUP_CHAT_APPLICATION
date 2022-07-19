const jwt = require('jsonwebtoken');
const User = require('../models/user');
module.exports=async(req,res,next)=>{
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
    // console.log(token,req.headers,authHeader);
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, id) => {
    // console.log('error:',err)
    // console.log(user,1);
    if (err) return res.sendStatus(403)
    // console.log(3)
    // const user=await User.findById(id)
    req.user=await User.findById(id);
    // console.log(req.user,'authenticator req.user')
    // req.user.id = user;
    next()
  })
}