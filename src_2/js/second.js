import "../scss/second.scss";
import * as bootstrap from "bootstrap";

const response = sessionStorage.getItem("apiData");
const API_data = JSON.parse(response);

document.querySelector(".clickTest").addEventListener("click", function (e) {
  console.log(API_data);

  API_data.results.forEach((element) => {
    console.log(element);
  });
});
