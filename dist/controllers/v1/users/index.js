'use strict';

var express = require('express')
   ,controller = require('./users.controller')
   ,router = express.Router()
   ,auth = require('../../../auth')
;

router.put('/:ID/:PLATFORM', auth.control, controller.createUser);
router.get('/', auth.control, controller.getAll);
router.get('/:ID', auth.control, controller.getUser);
router.delete('/:ID', auth.control, controller.deleteUser);
router.post('/:ID', auth.control, controller.updateUser);

module.exports = router;