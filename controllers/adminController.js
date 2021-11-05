const { db } = require('../database')

module.exports = {
    dataStudents: (req, res) => {
        let getQuery = `select * from students;`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'erorGetStudents')
            }
            res.status(200).send(result)
        })
    },

    dataStudentsById: (req, res) => {
        let getQuery = `select * from students where fullname = ${db.escape(req.body.fullname)};`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'erorGetStudents')
            }
            res.status(200).send(result[0])
        })
    },

    //soal_tugas, PAGINATE
    soalTugas: (req, res) => {
        const { page} = req.body
        let getQuery = `select * from tugas;`

        db.query(getQuery, (err, resultTugas) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'eror soal tugas')
            }
            let jumlahHalSoal = resultTugas.length
            let maxPage = Math.ceil(jumlahHalSoal / 1)
            let offsetPage = (page * 1) - 1

            let paginationSatuan = `select * from tugas limit 1 offset ${offsetPage};`

            db.query(paginationSatuan, (err, resultSoalPaginate) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                res.status(200).send([...resultSoalPaginate, maxPage])
            })
        
        })
    },

    nilaiTugas: (req, res) => {
        let getQuery = `select * from students s
        join nilai_tugas t
        on s.fullname = t.fullname;`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'erorNilaiTugas')
            }
            let update = `insert into nilai_tugas set ?` 
            db.query(update,req.body, (err, resultInsert) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err + 'insert nilai')
                }
                res.status(200).send(resultInsert)
            })
        })
    },

    //gak dipakek, select all soal gk perlu, langsung pakek yang pagination aja.
    dataAllSoalTugas: (req, res) => {
        let getQuery = `select * from tugas where materi = 'biologi';`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'erorGetStudents')
            }
            res.status(200).send(result)
        })
    },

    nilaiTugasByName: (req, res) => {
        const { page} = req.body
        let getQuery = `select * from nilai_tugas where fullname = ${db.escape(req.body.fullname)};`

        db.query(getQuery, (err, resultNilaiTugas) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'erorNilaiTugas by id')
            }
            let jumlahHalSoal = resultNilaiTugas.length
            let maxPage = Math.ceil(jumlahHalSoal / 2)
            let offsetPage = (page * 2) - 2

            let paginationSatuan = `select * from nilai_tugas limit 2 offset ${offsetPage};`

            db.query(paginationSatuan, (err, resultNilaiTgsPaginate) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err +'eror paginate nilai by name')
                }

                res.status(200).send([...resultNilaiTgsPaginate, maxPage])
            })
        })
    },

    soalUjian: (req, res) => {
        const { page} = req.body
        let getQuery = `select * from ujian;`

        db.query(getQuery, (err, resultTugas) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'eror soal UJIAN')
            }
            let jumlahHalSoal = resultTugas.length
            let maxPage = Math.ceil(jumlahHalSoal / 1)
            let offsetPage = (page * 1) - 1

            let paginationSatuan = `select * from ujian limit 1 offset ${offsetPage};`

            db.query(paginationSatuan, (err, resultSoalPaginate) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err + 'EROR PAGINATE SOAL UJIAN')
                }

                res.status(200).send([...resultSoalPaginate, maxPage])
            })
        
        })
    },

    nilaiUjianByName: (req, res) => {
        const { page} = req.body
        let getQuery = `select * from nilai_ujian where fullname = ${db.escape(req.body.fullname)};`

        db.query(getQuery, (err, resultNilaiUjian) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'erorNilaiTugas by id')
            }
            let jumlahHalSoal = resultNilaiUjian.length
            let maxPage = Math.ceil(jumlahHalSoal / 2)
            let offsetPage = (page * 2) - 2

            let paginationSatuan = `select * from nilai_ujian limit 2 offset ${offsetPage};`

            db.query(paginationSatuan, (err, resultUjianNilaiPaginate) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err)
                }

                res.status(200).send([...resultUjianNilaiPaginate, maxPage])
            })
        })
    },

    nilaiUjian: (req, res) => {
        let getQuery = `select * from students s
        join nilai_ujian t
        on s.fullname = t.fullname;`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'erorNilaiTugas')
            }
            let update = `insert into nilai_ujian set ?` 
            db.query(update,req.body, (err, resultInsert) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err + 'insert nilai ujian')
                }
                res.status(200).send(resultInsert)
            })
        })
    },
}