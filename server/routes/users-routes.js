const express = require('express')
const usersControllers = require('../controllers/users-controllers')

const router = express.Router()

router.post('/signin',usersControllers.signin)
router.post('/signup',usersControllers.signup)


module.exports = router