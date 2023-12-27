const express = require('express');
const router = express.Router();



 router.use('/user',require('./user'));
 router.use('/shorten',require('./shorten'));
 router.use('/useurl',require('./useurl'));
 router.use('/shortbyhash',require('./shortbyhash'));
 



module.exports=router;