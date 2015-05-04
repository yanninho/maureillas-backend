'use strict';

var express = require('express')
   ,controller = require('./feeds.controller')
   ,router = express.Router()
   ,auth = require('../../../auth')
;

router.get('/', controller.getAll);
router.put('/:FEED', controller.createFeed);
router.delete('/:FEED', controller.deleteFeed);

module.exports = router;