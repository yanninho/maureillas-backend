'use strict';

var express = require('express')
   ,controller = require('./platforms.controller')
   ,router = express.Router()
;

router.get('/', controller.getAll);
router.put('/:PLATFORM', controller.createPlatform);
router.delete('/:PLATFORM', controller.deletePlatform);

module.exports = router;
