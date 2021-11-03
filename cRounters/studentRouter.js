const router = require('express').Router()

const {studentController} = require('../controllers')

router.post('/profile-students', studentController.dataStudentsById)
router.patch('/update-profile/:id', studentController.updateProfile)
router.post('/link-materi', studentController.dataLinkMateri)
router.get('/all-materi', studentController.dataSemuaLink)

module.exports = router