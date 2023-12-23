const urlcontroller = require('../../../controllers/api/urlcontroller_api');

const express = require('express');
const router = express.Router();


 router.get('/:url(*)',urlcontroller.shorten); // to shorten


module.exports=router;