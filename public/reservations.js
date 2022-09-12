const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const address = document.querySelector('#address')
const state = document.querySelector('#state')
const datePicker = document.querySelector('#reservation-date')
const form = document.querySelector('form')
let reservationList = document.querySelector('#reservation-list')

function deleteReservation(id) {
    axios.delete(`http://localhost:4000/reservation/${id}`)
        .then(() => location.reload())
        .catch(err => console.log(err))
}

let notSelectableDates = []

function createDisplayDate(date){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    options.timeZone = 'UTC'
    const reqDate = new Date(date)
    const reqDateDisplay = reqDate.toLocaleDateString('en-US', options)
    return `${reqDateDisplay}`
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let resRequest = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        state: state.value,
        resDate: datePicker.value
    }
    
    axios.get('http://localhost:4000/reservation')
    .then(res => {
        const dataArr = res.data
        console.log(res.data)
        const {resDate} = res.data
        let dateWanted = resRequest.resDate //date that user wants to book
        let checkData = dataArr.filter(date => date.resdate === dateWanted)
        console.log(dateWanted + " <- This is the date wanted by the user")
        console.log(checkData , " This is checkData")
        if(checkData[0]){
            console.log("This date has already been selected!")
            alert("This date has already been selected!")
        }else{
            axios.post('http://localhost:4000/reservation', resRequest)
            .then(() => {
                location.reload()
                alert("Reservation submitted successfully!")
                
                // notSelectableDates.push(datePicker.value)
            })
            .catch(err => console.log('front end error', err))
    }
        })
    })
    



function getClientReservations() {
    axios.get('http://localhost:4000/reservation')
        .then(res => {
            res.data.forEach(reservation => {
                const dateDisplayText = createDisplayDate(reservation.resdate)
                const reservationElem = 
                `<div class="reservation-card">
                    <h2>${dateDisplayText}</h2>
                    <button onclick="deleteReservation(${reservation.resid})" class="delete">X</button>
                    </div>
                `
                reservationList.innerHTML += reservationElem    
            })
            // const deleteBtn = document.querySelector('.delete')
            // deleteBtn.addEventListener("click", deleteReservation);
        })
        .catch(err => console.log(err))
}

getClientReservations()

