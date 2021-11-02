const router = require('express').Router()

const {adminController} = require('../controllers')

router.get('/data-students', adminController.dataStudents)
router.get('/all-soaltugas', adminController.dataAllSoalTugas)
router.post('/soal-tugas', adminController.soalTugas)
router.post('/nilai-tugas', adminController.nilaiTugas)
router.post('/student-fullname', adminController.dataStudentsById)

module.exports = router