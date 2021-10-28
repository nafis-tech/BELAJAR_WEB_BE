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
}