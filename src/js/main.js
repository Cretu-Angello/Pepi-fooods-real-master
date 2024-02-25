import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import * as helpers from "/src/js/helpers.js";
import { filterOptions as options } from "./helpers";

//Selecting the correct container and adding the filter queries html
function listContainer(e) {
  e.preventDefault();
  const dropdownMenu = e.target;
  const inputField = dropdownMenu.querySelector(`.js--input-field`);
  const filterContainer = dropdownMenu.nextElementSibling;
  const containerName = filterContainer.dataset.container_name;

  helpers.addHtml(inputField.value, filterContainer);
  inputField.value = "";

  //close panel
  const dropdownInstance = new bootstrap.Dropdown(dropdownMenu);
  dropdownInstance.hide();

  //Add data to object
  filterContainer.querySelectorAll(".js--filter-box").forEach((elem) => {
    if (options[`${containerName}`].includes(elem.textContent.trim())) return;

    options[`${containerName}`].push(elem.textContent.trim().toLowerCase());
  });

  console.log(options);
}
helpers.searchBoxList.addEventListener("submit", listContainer);

//Removing filter queries
function removeFilter(e) {
  if (e.target.parentElement.classList.contains("js--filter-box")) {
    const parent = e.target.parentElement;
    helpers.removeBoxes(parent);
  }

  if (e.target.classList.contains("js--filter-box")) {
    helpers.removeBoxes(e.target);
  }
}
helpers.searchBoxList.addEventListener("click", removeFilter);

//Storing the main query on submit (This can only store one word, modify later)

function mainQuery(e) {
  e.preventDefault();
  const mainInput = document.querySelector(`.js--main-input`);
  options.query = mainInput.value.trim();

  apiRequest();
}
helpers.mainInput.addEventListener("submit", mainQuery);

//Making the API request
async function apiRequest() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
      helpers.API_key
    }${helpers.API_query(options)}`
  );
  const data = await response.json();
  console.log(data);
}
