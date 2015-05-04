'use strict';

var express = require('express')
   ,controller = require('./users.controller')
   ,router = express.Router()
   ,auth = require('../../../auth')
;

router.put('/:ID/:PLATFORM', controller.createUser);
router.get('/', controller.getAll);
router.get('/:ID', controller.getUser);
router.delete('/:ID', controller.deleteUser);
router.post('/:ID', controller.updateUser);

module.exports = router;