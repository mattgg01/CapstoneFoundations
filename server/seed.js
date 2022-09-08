require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')


const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`

        create table cc_reservations (
            date date
        );

        insert into cc_reservations (date)
        values ('2021-05-04');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}





