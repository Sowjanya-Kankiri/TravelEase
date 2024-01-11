document.addEventListener('DOMContentLoaded', function () {
  const loginSignupButton = document.getElementById('loginSignupButton');
  const dropdownContent = document.createElement('div');  // Create the dropdown content

  // Set the ID for the dropdown content
  dropdownContent.id = 'loginSignupDropdown';
  dropdownContent.className = 'dropdown-content';
  dropdownContent.innerHTML = `
    <a href="signUp.html">SignUp</a>
    <a href="signIn.html">SignIn</a>
  `;

  // Checking if the user is signed in or not
  const user = JSON.parse(localStorage.getItem('signin'));

  // Remove existing event listeners
  loginSignupButton.removeEventListener('click', showOptions);

  if (user) {
    // Creating only the welcome button
    const welcomeButton = document.createElement('button');
    welcomeButton.innerHTML = `Welcome, ${user.name}`;
    welcomeButton.addEventListener('click', function () {
      window.location.href = 'account.html'; // Redirect to the account page
    });
    loginSignupButton.innerHTML = ''; // Clear any existing content
    loginSignupButton.appendChild(welcomeButton);
  } else {
    // Creating SignIn / SignUp button
    const signInSignUpButton = document.createElement('button');
    signInSignUpButton.textContent = 'SignIn / SignUp';
    signInSignUpButton.addEventListener('click', showOptions);

    loginSignupButton.innerHTML = ''; // Clear any existing content
    loginSignupButton.appendChild(signInSignUpButton);
    loginSignupButton.appendChild(dropdownContent); // Append the dropdown content here

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
      if (!event.target.matches('.dropdown button')) {
        dropdownContent.classList.remove('show');
      }
    };
  }
});

function showOptions() {
  const dropdownContent = document.getElementById('loginSignupDropdown');
  dropdownContent.classList.toggle('show');
}


let container = document.getElementById("container");
let originalData = [];
function appendProducts(data) {
  container.innerHTML = null;
  data.forEach(function (el) {
    createProductElement(el);
  });
}

function createProductElement(el) {
  let div = document.createElement('div');
  div.classList.add('product-container');

  let imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  let image = document.createElement('img')
  image.src = el.img_url1;

  let favIcon = document.createElement('span');
  favIcon.innerText = '♡';
  favIcon.classList.add('favIcon');

  
  // Check if the place is already in favorites
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.some(place => place.id === el.id)) {
    favIcon.classList.add('favorited');
  }

  favIcon.addEventListener('click', function () {
    toggleFavorite(el);
    this.classList.toggle('favorited');
  });

  image.addEventListener('click', function () {
    navigateToDetails(el.id);
  });

  function navigateToDetails(placeId) {
    window.location.href = `details.html?id=${placeId}`;
  }

  imageContainer.append(image, favIcon);

  let location = document.createElement('h5')
  location.innerText = el.location;
  location.style.fontSize = "18px"

  let rating = document.createElement('p')
  rating.innerText = `★` + el.rating;
  rating.style.justifyContent = "right";


  let price = document.createElement('p')
  price.innerText = el.price_perNight + ` ` + `night`;
  price.style.fontSize = "16px";

  div.append(imageContainer, location, rating, price);

  container.append(div);

}
function toggleFavorite(place) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.findIndex(item => item.id === place.id);

  if (index !== -1) {
    // Remove from favorites
    favorites.splice(index, 1);
  } else {
    // Add to favorites
    favorites.push(place);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}
async function getData() {
  try {
    let res = await fetch('http://localhost:3000/all_data');
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    originalData = await res.json();
    appendProducts(originalData);
  }
  catch (err) {
    console.log('err:', err);
  }
}

//search and filter functionality
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const filteredData = originalData.filter(el =>
      el.title.toLowerCase().includes(searchValue)
    );
    appendProducts(filteredData);
  });

  getData();
});
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.s-navbar button');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const searchInput = document.getElementById('searchInput');

  // Add an event listener to the input to remove the 'active' class
  searchInput.addEventListener('input', function () {
    buttons.forEach(btn => btn.classList.remove('active'));
  });
});





//getting and displaying data separatly

let beaches = document.getElementById("beaches");
beaches.addEventListener('click', () => {
  async function getData() {
    try {
      let res = await fetch('http://localhost:3000/beaches');
      data = await res.json();
      appendProducts(data);
    }
    catch (err) {
      console.log('err:', err);
    }
  }
  getData();
})
let farmhouses = document.getElementById("farm");
farmhouses.addEventListener('click', () => {
  async function getData() {
    try {
      let res = await fetch('http://localhost:3000/formhouses');
      data = await res.json();
      appendProducts(data);
    }
    catch (err) {
      console.log('err:', err);
    }
  }
  getData();
})
let houseboats = document.getElementById("houseboats");
houseboats.addEventListener('click', () => {
  async function getData() {
    try {
      let res = await fetch('http://localhost:3000/houseboats');
      data = await res.json();
      appendProducts(data);
    }
    catch (err) {
      console.log('err:', err);
    }
  }
  getData();
})
let lakes = document.getElementById('lakes')
lakes.addEventListener('click', () => {
  async function getData() {
    try {
      let res = await fetch('http://localhost:3000/lakes');
      data = await res.json();
      appendProducts(data);
    }
    catch (err) {
      console.log('err:', err);
    }
  }
  getData();
})
let earth_homes = document.getElementById("earth_homes");
earth_homes.addEventListener('click', () => {
  async function getData() {
    try {
      let res = await fetch('http://localhost:3000/earth_homes');
      data = await res.json();
      appendProducts(data);
    }
    catch (err) {
      console.log('err:', err);
    }
  }
  getData();
})
let treehouses = document.getElementById("treehouses");
treehouses.addEventListener('click', () => {
  async function getData() {
    try {
      let res = await fetch('http://localhost:3000/treehouses');
      data = await res.json();
      appendProducts(data);
    }
    catch (err) {
      console.log('err:', err);
    }
  }
  getData();
})
let camping = document.getElementById("camping");
camping.addEventListener('click', () => {
  async function getData() {
    try {
      let res = await fetch('http://localhost:3000/camping');
      data = await res.json();
      appendProducts(data);
    }
    catch (err) {
      console.log('err:', err);
    }
  }
  getData();
})