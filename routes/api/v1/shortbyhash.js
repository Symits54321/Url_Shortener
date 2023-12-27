const urlcontroller = require('../../../controllers/api/urlcontroller_api');

const express = require('express');
const router = express.Router();


 router.get('/:hash/*',urlcontroller.customshorten); // to shorten by own hashcode


module.exports=router;