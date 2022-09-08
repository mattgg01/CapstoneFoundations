require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')


const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


module.exports = {
    deleteReservation: (req,res) =>{
        console.log(req.params)
        let {id} = req.params
        sequelize.query(`
        DELETE FROM cc_reservations
        WHERE resId = ${id}
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    getClientReservations: (req, res) => {
        sequelize.query(`select * from cc_reservations
        order by resDate desc;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))

    },
    requestReservation: (req, res) => {
        const {firstName, lastName, email, phone, address, state, resDate} = req.body
        console.log(req.body) 
        sequelize.query(`insert into cc_reservations (firstName, lastName, email, phone, address, state, resDate)
        values ('${firstName}', '${lastName}', '${email}', '${phone}', '${address}', '${state}', '${resDate}'); `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
        }
    };