const express = require('express')
const { getUsers, getUser } = require('./user.controller')
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)

module.exports = router