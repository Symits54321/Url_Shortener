const express = require('express');
const router = express.Router();



 router.use('/user',require('./user'));
 router.use('/shorten',require('./shorten'));
 router.use('/shorturl',require('./shorturl'));
 



module.exports=router;