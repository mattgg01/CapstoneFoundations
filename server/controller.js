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
    getClientReservations: (req, res) => {
        sequelize.query(`select * from cc_reservations
        order by date desc;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }, 

    requestReservation: (req, res) => {
        const {dateSelected} = req.body
        console.log(req.body) 
        sequelize.query(`insert into cc_reservations (date)
        values ('${dateSelected}'); `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }
    };