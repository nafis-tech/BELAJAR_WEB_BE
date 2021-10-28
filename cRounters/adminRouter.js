const router = require('express').Router()

const {adminController} = require('../controllers')

router.get('/data-students', adminController.dataStudents)

module.exports = router