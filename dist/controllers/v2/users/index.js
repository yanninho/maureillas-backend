'use strict';

var express = require('express')
   ,controller = require('./users.controller')
   ,router = express.Router()
;

router.put('/', controller.createUser);
router.get('/', controller.getAll);
router.get('/:ID', controller.getUser);
router.delete('/:ID', controller.deleteUser);
router.delete('/', controller.deleteAllUser);
router.post('/:ID', controller.updateUser);

module.exports = router;