'use strict';

var express = require('express')
   ,controller = require('./messages.controller')
   ,router = express.Router()
;

router.put('/', controller.sendMessages);
router.put('/:FEED/:DATE', controller.scheduleMessages);
router.put('/custom', controller.sendCustomMessages);
router.post('/', controller.checkMessages);

module.exports = router;