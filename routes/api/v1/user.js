const usercontroller = require('../../../controllers/api/usercontroller_api');
const passport = require('passport');

const express = require('express');

const router = express.Router();


 router.post('/registration',usercontroller.registration); // to register
 router.post('/login',passport.authenticate('local',{failureRedirect: '/error'}),usercontroller.login); // to login
// router.post('/shorten',usercontroller.shorten); // to shorten
//  router.post('/newshorturl',usercontroller.shortUrlRender); // to renderUrl
router.get('/error',usercontroller.error);
 router.get('/logout',usercontroller.logout); // to logout

module.exports=router;