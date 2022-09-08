require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')
const {getClientReservations, requestReservation, deleteReservation} = require('./controller.js')

app.use(express.json())
app.use(cors())


app.post('/seed', seed)


// RESERVATIONS
app.get('/reservation', getClientReservations)
app.post('/reservation', requestReservation)
app.delete(`/reservation/:id`, deleteReservation)

// app.get('/user', getUserInfo)
// app.put('/user', updateUserInfo)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))