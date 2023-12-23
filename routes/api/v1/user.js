const usercontroller = require('../../../controllers/api/usercontroller_api');
const passport = require('passport');

const express = require('express');

const router = express.Router();


 router.post('/registration',usercontroller.registration); // to register
 router.get('/errormsg',usercontroller.errormsg);
 router.post('/login',passport.authenticate('local',{failureRedirect: '/user/errormsg'}),usercontroller.login); // to login


 router.get('/logout',usercontroller.logout); // to logout

module.exports=router;