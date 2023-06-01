import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("From init()");
  console.log(config);
  let cities = await fetchCities();
  console.log("cities------>",cities);

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let landingPageUrl = "/cities";
  try{
    let res = await fetch(`${config.backendEndpoint}${landingPageUrl}`);
  let data = await res.json();
  return data;
  } catch (error){
    console.log("Error in fetching cities ",error);
    return null;
  }
}


function addCityToDOM(id, city, description, image) {
  let container = document.createElement("div");
  container.className = "col-sm-6 col-lg-3 mb-4";


  let innerHTML = `
       <a href="pages/adventures/?city=${id}" id="${id}"> 
      <div class="tile">
        <div class="card bg-dark text-white tile-text">
          <img class="city-image" src="${image}" alt="${city}" />
          <div class="card-img-overlay d-flex flex-column justify-content-end">
            <h5 class="card-title text-center mb-0 pb-3">${city}</h5>
            <p class="card-text text-center">${description}</p>
          </div>
        </div>
      </div>
    </a>
  `;
  container.innerHTML = innerHTML;

  const dataContainer = document.getElementById("data");
  dataContainer.appendChild(container);
  
}

export { init, fetchCities, addCityToDOM };
