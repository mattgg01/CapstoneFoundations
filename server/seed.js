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
        CREATE TABLE cc_reservations (
            resId SERIAL PRIMARY KEY,
            firstName varchar(40),
            lastName varchar(40),
            email varchar(70),
            phone varchar(14),
            address varchar(60),
            state varchar(30),
            resDate DATE
        );
        
        insert into cc_reservations (firstName, lastName, email, phone, address, state, resDate)
        values ('Daniel', 'Smith', 'dsmith@gmail.com', '2712022265', '481 Bowlers Lane', 'Kentucky', '2021-05-04');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}