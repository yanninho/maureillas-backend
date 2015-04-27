'use strict';

var express = require('express')
   ,controller = require('./messages.controller')
   ,router = express.Router()
   ,auth = require('../../../auth')
;

router.post('/:FEED', auth.control, controller.sendMessages);

module.exports = router;