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

    //soal_tugas
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
}