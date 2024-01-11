// Define the getUserEmail function outside the DOMContentLoaded event listener
function getUserEmail() {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail;
}

document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('signin'));
    const logoutButton = document.getElementById('logoutButton');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const favoritedPlacesList = document.getElementById('favoritePlacesList');
    const bookedPlacesList = document.getElementById('bookedPlacesList');

    if (user) {
        // Displaying user information
        userName.innerText = user.name;
        userEmail.innerText = user.email;

        const userEmailValue = getUserEmail();

        if (userEmailValue) {
            const bookedPlacesKey = `bookedPlaces_${userEmailValue}`;
            displayBookedPlaces(bookedPlacesKey);
        } else {
            console.error('User email not found.');
        }

        // Fetching and displaying favorited places
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        loadFavoritePlaces(favorites, favoritedPlacesList);

    } else {
        // If not signed in, redirect to the sign-in page
        window.location.href = 'signin.html';
    }

    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('signin');
        localStorage.removeItem('favorites');
        window.location.href = 'home.html';
    });

    function displayBookedPlaces(key) {
        if (!bookedPlacesList) {
            console.error("Element with ID 'bookedPlacesList' not found.");
            return;
        }

        // Retrieve booked places from local storage
        const bookedPlaces = JSON.parse(localStorage.getItem(key)) || [];

        // Clear previous content
        bookedPlacesList.innerHTML = '';

        // Iterate through booked places and display them
        bookedPlaces.forEach(place => {
            const listItem = document.createElement('li');
            const placeName = place.placeName || 'Unknown Place';
            const checkInDate = place.checkInDate || 'Unknown Check-in Date';
            const checkOutDate = place.checkOutDate || 'Unknown Check-out Date';
            listItem.textContent = `Place: ${placeName}, Check-in: ${checkInDate}, Check-out: ${checkOutDate}`;
            bookedPlacesList.appendChild(listItem);
        });
    }

    function loadFavoritePlaces(favorites, favoritedPlacesList) {
        if (favoritedPlacesList) {
            // Clear previous content
            favoritedPlacesList.innerHTML = '';

            // Iterate through favorited places and display them
            favorites.forEach(place => {
                const listItem = document.createElement('li');
                listItem.innerText = place.title || 'Unknown Place'; // Adjust this to display the relevant information
                favoritedPlacesList.appendChild(listItem);
            });
        }
    }

    loadUserData();
});

function loadUserData() {
    const signedInUser = JSON.parse(localStorage.getItem('signin'));
    if (signedInUser) {
        userName.innerText = signedInUser.name;
        userEmail.innerText = signedInUser.email;
    }
}
