console.log('in browser');

const userList = document.querySelector('#users-list');
const restaurantList = document.querySelector('#restaurants-list');

const fetchData = async()=> {
    let response = await fetch('/api/users');
    const users = await response.json();
    let html = users.map( user => {
        return `
        <li>
            ${ user.name }
        </li>
        `;
    }).join('');
    userList.innerHTML = html;
    //console.log(userData);

};

fetchData();

const fetchRestaurants = async()=> {
    const response = await fetch('/api/restaurants');
    const restaurantData = await response.json();
    console.log(restaurantData);
    return restaurantData;

};


