import * as bootstrap from "bootstrap";
import x_icon from "/resources/svg/x_icon.svg";

//Global variables
export const searchBoxList = document.querySelector(`.js--search-box-list`);
export const mainInput = document.querySelector(`.js--main-form`);

export const filterOptions = {
  query: "",
  ingredients: [],
  cuisine: [],
  diet: [],
  intolerances: [],
};

//Api data
export const API_key = "f8803654437349daa6a3aa42e63894bf";

export const API_query = function (options) {
  return `&query=${
    options.query
  }&cuisine=${options.cuisine.join()}&diet=${options.diet.join()}&intolerances=${options.intolerances.join()}&includeIngredients=${options.ingredients.join()}`;
};

//Filter queries html
export function addHtml(value, HtmlContainer) {
  const html = `<button
    class="col-auto align-items-center border shadow-sm fw-medium text-break me-1 px-1 ccss--font-resize-sm ccss--dropdown-item js--filter-box"
    >
    ${value.toLowerCase()}
    <img
    src="${x_icon}"
    alt=""
    class="img-fluid"
    />
    </button>`;

  if (value !== "") {
    HtmlContainer.insertAdjacentHTML("beforeend", html);
  }
}

//Removing boxes
export function removeBoxes(target) {
  const containerName = target.parentElement.dataset.container_name;
  const filterData = target.textContent.trim();
  const filterDataIndex = filterOptions[containerName].indexOf(filterData);

  filterOptions[`${containerName}`].splice(filterDataIndex, 1);
  console.log(filterOptions);
  target.remove();
}
