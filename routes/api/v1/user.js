const usercontroller = require('../../../controllers/api/usercontroller_api');

const express = require('express');
const router = express.Router();


 router.post('/registration',usercontroller.registration); // to register
 router.post('/login',usercontroller.login); // to login
// router.post('/shorten',usercontroller.shorten); // to shorten
//  router.post('/newshorturl',usercontroller.shortUrlRender); // to renderUrl
//  router.get('/logout',usercontroller.logout); // to logout

module.exports=router;