const urlcontroller = require('../../../controllers/api/urlcontroller_api');

const express = require('express');
const router = express.Router();

const passport = require('passport');


 router.get('/:url',passport.authenticate('local',{failureRedirect: '/error'}),urlcontroller.shorten); // to shorten


module.exports=router;