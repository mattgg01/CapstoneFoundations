const datePicker = document.querySelector('#reservation-date')
const form = document.querySelector('form')
let reservationList = document.querySelector('#reservation-list')


function createDisplayDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const reqDate = new Date(date)
    const reqDateDisplay = reqDate.toLocaleDateString('en-US', options)
    return `${reqDateDisplay}`
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let date = {
        dateSelected: datePicker.value
    }
    axios.post('http://localhost:4000/reservation', date)
        .then(() => {
            resetFormValues()
            location.reload()
        })
        .catch(err => console.log('front end error', err))
})


function getClientReservations() {
    axios.get('http://localhost:4000/reservation')
        .then(res => {
            res.data.forEach(reservation => {
                const dateDisplayText = createDisplayDate(reservation.date)
                const reservationElem = 
                `<div class="reservation-card">
                    <h2>${dateDisplayText}</h2>
                </div>`

                reservationList.innerHTML += reservationElem                
            })
        })
        .catch(err => console.log(err))
}




getClientReservations()