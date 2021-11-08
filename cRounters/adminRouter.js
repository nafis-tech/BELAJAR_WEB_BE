const router = require('express').Router()

const {adminController} = require('../controllers')

router.get('/data-students', adminController.dataStudents)
router.get('/all-soaltugas', adminController.dataAllSoalTugas)
router.post('/soal-tugas', adminController.soalTugas)
router.post('/nilai-tugas', adminController.nilaiTugas)
router.post('/student-fullname', adminController.dataStudentsById)
router.post('/nilai-byname', adminController.nilaiTugasByName)

router.post('/soal-ujian', adminController.soalUjian)
router.post('/nilai-ujian', adminController.nilaiUjian)
router.post('/ujian-byname', adminController.nilaiUjianByName)

router.post('/rekap-ujian', adminController.rekapAllNilaiUjian)
router.post('/rekap-tugas', adminController.rekapNilaiTugasAll)


module.exports = router