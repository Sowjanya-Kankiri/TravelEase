let details;
document.addEventListener('DOMContentLoaded', function () {
    // Fetching  the place details based on the ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get('id');

    getDetails(placeId);
});

async function getDetails(placeId) {
    try {
        let res = await fetch(`http://localhost:3000/all_data/${placeId}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        let data = await res.json();
        displayDetails(data);

    } catch (err) {
        console.log('err:', err);
    }
}

function displayDetails(details) {

    document.getElementById('detailsTitle').innerText = details.title;

    const imageContainer = document.getElementById('imageContainer');
    for (let i = 1; i <= 6; i++) {
        const imageUrl = details[`img_url${i}`];
        if (imageUrl) {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = `Image ${i}`;
            imgElement.style.width = '100%';

            carouselItem.appendChild(imgElement);
            imageContainer.appendChild(carouselItem);

            
        }
    }
    imageContainer.firstChild.classList.add('active');
    details.rate=details.price_perNight;
    details=details;

    document.getElementById('detailsDescription').innerText = details.description;
    document.getElementById('rooms').innerText = details.rooms;
    document.getElementById('numOfBeds').innerText = details.Numofbeds;
    document.getElementById('washrooms').innerText = details.bathroom;
    document.getElementById('detailsPrice').innerText = `${details.price_perNight} per night`;
    document.getElementById('detailsRating').innerText = `Rating: ★${details.rating.toFixed(2)}`;

    const extraOffersContainer = document.getElementById('extraOffers');
    extraOffersContainer.innerHTML = ''; // Clear previous content
    for (let i = 1; i <= 8; i++) {
        const extraOffer = details[`extra_offers_${i}`];
        if (extraOffer) {
            const listItem = document.createElement('li');
            listItem.textContent = extraOffer;
            extraOffersContainer.appendChild(listItem);
        }
    }

}

function proceedToConfirmation() {

        // Checking if the user is signed in
        const user = JSON.parse(localStorage.getItem('signin'));
        if (!user) {
            alert('Please sign in before booking a place.');
            // Redirect to the sign-in page or handle it as per your application flow
            window.location.href = 'signin.html';
            return;
        }
        
    const selectedPlace=document.getElementById('detailsTitle').innerText;
    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;
    const numAdults = document.getElementById('numAdults').value;
    const numChildren = document.getElementById('numChildren').value;
    const roomPriceElement = document.getElementById('detailsPrice');
    const roomPrice = parseFloat(roomPriceElement.innerText.replace(/[^\d.]/g, ''));
    
    // checking if all the inputs are filled or not
    if (!checkInDate || !checkOutDate || !numAdults) {
        alert('Please fill in all required details for booking the hotel.');
        return;
    }

    // Calculating the room price 
    const gstPercentage = 2; 
    const discountPercentage = 10; 
    const noOfDays = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24); 
    const subtotal = roomPrice * noOfDays;
    const gstAmount = (subtotal * gstPercentage) / 100;
    const discountAmount = (subtotal * discountPercentage) / 100;
    const totalPrice = (subtotal + gstAmount - discountAmount).toFixed(2);

    const imageUrl = encodeURIComponent(document.getElementById('imageContainer').querySelector('img').src);
    const title = encodeURIComponent(document.getElementById('detailsTitle').innerText);
    var rating = encodeURIComponent(document.getElementById('detailsRating').innerText);

    // Redirecting to confirmation page with details
    const queryParams = `?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numAdults=${numAdults}&numChildren=${numChildren}&roomPrice=${roomPrice}&gstAmount=${gstAmount}&discountAmount=${discountAmount}&totalPrice=${totalPrice}&img_url1=${imageUrl}&title=${title}&rating=${rating}`;
    

    function getUserEmail() {
        // Logic to get user email from wherever it's stored
        // For example, you might retrieve it from local storage
        const userEmail = localStorage.getItem('userEmail');
        return userEmail;
      }

    const userEmail = getUserEmail(); // Implement a function to get the current user's email
   
    if (userEmail) {
        // If logged in, store booked details for the user
        const bookedPlacesKey = `bookedPlaces_${userEmail}`;
        const bookedPlaces = JSON.parse(localStorage.getItem(bookedPlacesKey)) || [];
        bookedPlaces.push({
          placeName: selectedPlace.name,
          checkInDate: selectedPlace.checkInDate,
          checkOutDate: selectedPlace.checkOutDate,
        });
        localStorage.setItem(bookedPlacesKey, JSON.stringify(bookedPlaces));
      }
    
    


    window.location.href = `confirmation.html${queryParams}`;
}

