'use strict';

var express = require('express')
   ,controller = require('./platforms.controller')
   ,router = express.Router()
   ,auth = require('../../../auth')
;

router.get('/', auth.control, controller.getAll);
router.put('/:PLATFORM', auth.control, controller.createPlatform);
router.delete('/:PLATFORM', auth.control, controller.deletePlatform);

module.exports = router;
