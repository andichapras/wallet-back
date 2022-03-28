const express = require('express')

const userController = require('../controllers/user-controller')

const router = express.Router()

router.get('/', userController.getAllUser)

router.post('/', userController.createUser)

router.get('/:userid', userController.getUser)

module.exports = router