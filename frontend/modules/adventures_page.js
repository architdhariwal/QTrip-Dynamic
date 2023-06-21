
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let param = new URLSearchParams(search);
  let city = param.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let adventurePageUrl = `/adventures/?city=${city}`;
  try{
    let res = await fetch(`${config.backendEndpoint}${adventurePageUrl}`);
    let data = await res.json();
    return data;
  } 
  catch (error){
    console.log("Error in fetching cities ",error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const dataContainer = document.getElementById("data");

  adventures.forEach((adventure) => {
    const { id, image, name, costPerHead, currency, duration, category } = adventure;

    let container = document.createElement("div");
    container.className = "col-sm-6 col-lg-3 mb-4";

    let innerHTML = `
      <a href="detail/?adventure=${id}" id="${id}">
        <div class="activity-card">
          <img class="activity-card-img" src="${image}" alt="${name}" />
          <div class="category-banner">${category}</div>
          <div class="adventure-details">
            <h2>${name}</h2>
            <p>Cost per head: ${costPerHead} ${currency}</p>
            <p>Duration: ${duration} Hours</p>
          </div>
        </div>
      </a>
    `;
    container.innerHTML = innerHTML;

    dataContainer.appendChild(container);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter(adventure => adventure.duration >= low && adventure.duration <= high);
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter(adventure => categoryList.includes(adventure.category));
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

   // Create a copy of the original list to apply filters
  let filteredList = [...list];

  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    // Filter by duration and category together
    const [low, high] = filters["duration"].split("-"); // Split the duration range into low and high values
    const categoryList = filters["category"];

    filteredList = filterByDuration(filteredList, low, high);
    filteredList = filterByCategory(filteredList, categoryList);
  } else if (filters["duration"].length > 0) {
    // Filter by duration only
    const [low, high] = filters["duration"].split("-"); // Split the duration range into low and high values

    filteredList = filterByDuration(filteredList, low, high);
  } else if (filters["category"].length > 0) {
    // Filter by category only
    const categoryList = filters["category"];

    filteredList = filterByCategory(filteredList, categoryList);
  }

  return filteredList;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filtersString = localStorage.getItem('filters');
  if (filtersString) {
    return JSON.parse(filtersString);
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  const durationSelect = document.getElementById("duration-select");
  durationSelect.value = filters.duration;

  const categoryListContainer = document.getElementById("category-list");

  // Clear the category list container
  categoryListContainer.innerHTML = "";

  // Generate pills for each selected category
  filters.category.forEach(category => {
    const pill = document.createElement("div");
    pill.className = "category-filter";
    pill.innerText = category;

    categoryListContainer.appendChild(pill);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
