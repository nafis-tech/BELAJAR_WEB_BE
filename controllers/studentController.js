const { db } = require('../database')

module.exports = {
    dataStudentsById: (req, res) => {
        let getQuery = `select * from students where fullname = ${db.escape(req.body.fullname)};`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'erorGetStudents')
            }
            res.status(200).send(result)
        })
    },
    updateProfile: (req, res) => {
        const updateUser = `update students set ? where id_students = ${req.params.id}`

        db.query(updateUser, req.body, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'eror UPDATE PROFILE')
            }
            let getAllUsers = `select * from students where iduser = ${req.params.id}`

            db.query(getAllUsers, (err2, result2) => {
                if (err) {
                    console.log(err2)
                    res.status(400).send(err2)
                }
                res.status(200).send(result2)
            })
        })
    },

    dataLinkMateri: (req, res) => {
        const { page } = req.body
        let getQuery = `select * from materi;`

        db.query(getQuery, (err, resultTugas) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'eror GET LINK MATERI')
            }
            let jumlahHalSoal = resultTugas.length
            let maxPage = Math.ceil(jumlahHalSoal / 8)
            let offsetPage = (page * 8) - 8

            let paginationSatuan = `select * from materi limit 8 offset ${offsetPage};`

            db.query(paginationSatuan, (err, resultSoalPaginate) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err + 'PAGINATE LINK MATERI')
                }

                res.status(200).send([...resultSoalPaginate, maxPage])
            })
        
        })
    },

    dataSemuaLink: (req, res) => {
        let getQuery = `select * from materi;`

        db.query(getQuery, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err + 'eror SEMUA LINK MATERI')
            }
            res.status(200).send(result)
        })
    },
}