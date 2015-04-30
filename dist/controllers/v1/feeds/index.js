'use strict';

var express = require('express')
   ,controller = require('./feeds.controller')
   ,router = express.Router()
   ,auth = require('../../../auth')
;

router.get('/', auth.control, controller.getAll);
router.put('/:FEED', auth.control, controller.createFeed);
router.delete('/:FEED', auth.control, controller.deleteFeed);

module.exports = router;