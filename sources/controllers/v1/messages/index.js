'use strict';

var express = require('express')
   ,controller = require('./messages.controller')
   ,router = express.Router()
   ,auth = require('../../../auth')
;

router.post('/:FEED', auth.control, controller.sendMessages);
router.post('/:FEED/:DATE', auth.control, controller.scheduleMessages);
router.post('/', auth.control, controller.checkMessages);

module.exports = router;