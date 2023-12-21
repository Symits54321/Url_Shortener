const urlcontroller = require('../../../controllers/api/urlcontroller_api');

const express = require('express');
const router = express.Router();


 router.post('/:url',urlcontroller.shorten); // to shorten
// router.post('/newshorturl',usercontroller.shortUrlRender); // to renderUrl
//  router.get('/logout',usercontroller.logout); // to logout

module.exports=router;