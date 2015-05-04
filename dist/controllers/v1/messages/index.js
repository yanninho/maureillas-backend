'use strict';

var express = require('express')
   ,controller = require('./messages.controller')
   ,router = express.Router()
   ,auth = require('../../../auth')
;

router.put('/:FEED', controller.sendMessages);
router.put('/:FEED/:DATE', controller.scheduleMessages);
router.put('/', controller.sendCustomMessages);
router.post('/', controller.checkMessages);

module.exports = router;