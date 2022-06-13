console.log('in browser');

const api = require('./api');
const { fetchUsers, fetchRestaurants, fetchReservations } = api;
const usersList = document.querySelector('#users-list');
const restaurantList = document.querySelector('#restaurants-list');
const reservationsList = document.querySelector('#reservations-list');

let users;
let restaurants;

const fetchData = async()=> {
    const results = await Promise.all([
        fetchUsers(), 
        fetchRestaurants()
    ]);
    users = results[0];
    restaurants = results[1];
    //const users = await fetchUsers(); //turn this into Promise.all for efficiency
    renderUsers();


    //response = await fetch('/api/restaurants'); //we put this in the src/api
    //const restaurants = await fetchRestaurants(); //put into above Promise.all
    html = restaurants.map( retaurant => {
        return `
        <li>
            ${ retaurant.name }
        </li>
        `;
    }).join('');
    restaurantList.innerHTML = html;
    renderReservations();//calling this here ensures that the reservations still show up on a broswer refresh
};

const renderUsers = async() => {
    const hash = window.location.hash.slice(1);
    let html = users.map( user => {
        return `
        <li ${ hash*1 === user.id ? "class='selected'" : ''}>
            <a href='#${user.id}'>
                ${ user.name }
            </a>
        </li>
        `;
    }).join('');
    usersList.innerHTML = html;
};

const renderReservations = async() => {
    const hash = window.location.hash.slice(1);
    const reservations = await fetchReservations(hash);
    const html = reservations.map( reservation => {
        const restaurant = restaurants.find( restaurant => restaurant.id === reservation.restaurantId)
        console.log(restaurant.name)
        return `
            <li>
                ${ restaurant.name }
            </li>
        `
    }).join('')
    reservationsList.innerHTML = html;
}

window.addEventListener('hashchange', ()=> {
    renderReservations();
    renderUsers();
});

fetchData();


//i originally created a 2nd function for the restaurantList, 
//but we can put it all in the same function by using 'let' and 
//reassigning the values for the 2nd list.