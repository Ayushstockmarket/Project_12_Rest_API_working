const light_mode = document.querySelector(".light-mode");
const dark_mode = document.querySelector(".dark-mode");
const body = document.querySelector("body");
const apiCountry = "https://restcountries.com/v3.1/all";
const cards_folder = document.querySelector(".cards_folder");
const inputDatafetchSearch = document.querySelector(".inputDatafetchSearch");
let apiDataStore = [];
let inputSearchValue;
function modes() {
  // Apply the saved theme on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.style.backgroundColor = savedTheme === "dark" ? "black" : "white";
    body.style.color = savedTheme === "dark" ? "white" : "black";
    light_mode.classList.toggle("none", savedTheme === "dark");
    dark_mode.classList.toggle("none", savedTheme === "light");
  }

  // Light mode button
  light_mode.addEventListener("click", () => {
    light_mode.classList.add("none");
    dark_mode.classList.remove("none");
    body.style.backgroundColor = "black";
    body.style.color = "white";
    localStorage.setItem("theme", "dark"); // Save theme as dark
  });

  // Dark mode button
  dark_mode.addEventListener("click", () => {
    dark_mode.classList.add("none");
    light_mode.classList.remove("none");
    body.style.backgroundColor = "white";
    body.style.color = "black";
    localStorage.setItem("theme", "light"); // Save theme as light
  });
}
function clearPreviousOutput() {
  cards_folder.innerHTML = ""; // Clear previous results
}
function createCardsThenAppend(apiDataStore, index) {
  const createAnchorThenAppend = document.createElement("a");
  createAnchorThenAppend.classList.add("anchor_cards");
  createAnchorThenAppend.setAttribute("href", "https://example.com");
  createAnchorThenAppend.setAttribute("target", "_blank");
  createAnchorThenAppend.innerHTML = `
                            <div class="country-image">
                                <img class="country-images-png" src="${apiDataStore[index].flags.png}"alt="">
                            </div>
                            <div class="country-data">
                                <h1 class="country_card_data_row-1">${apiDataStore[index].name.common}</h1>
                                <p class="country_card_data_row-2">
                                    <strong class="Population">Population:</strong>
                                    <span class="Population-data">${apiDataStore[index].population}</span>
                                </p>
                                <p class="country_card_data_row-2">
                                    <strong class="Region">Region:</strong>
                                    <span class="Region-data">${apiDataStore[index].region}</span>
                                </p>
                                <p class="country_card_data_row-3">
                                    <strong class="Capital">Capital:</strong>
                                    <span class="Capital-data">${apiDataStore[index].capital}</span>
                                </p>
                            </div>`;
  cards_folder.appendChild(createAnchorThenAppend);
}
async function apiCountryFunction() {
  try {
    const response = await fetch(apiCountry);
    const data = await response.json();
    apiDataStore = data;
    countryCards();
    inputDataStore();
    filterBaseOnRegion();
  } catch (error) {
    console.error("Error fetching country data:", error);
  }
}
function inputDataStore() {
  inputDatafetchSearch.addEventListener("input", () => {
    inputSearchValue = inputDatafetchSearch.value.toLowerCase();
    clearPreviousOutput();
    apiDataStore.forEach((e, index) => {
      if (
        apiDataStore[index].name.common.toLowerCase().includes(inputSearchValue)
      ) {
        createCardsThenAppend(apiDataStore, index);
      }
    });
  });
}
function filterBaseOnRegion() {
  apiDataStore.forEach((e, index) => {
    const filterData = document.querySelector("#filter");
    filterData.addEventListener("change", () => {
      clearPreviousOutput();
      apiDataStore.forEach((e, index) => {
        if (
          apiDataStore[index].region.toLowerCase() ===
          filterData.value.toLowerCase()
        ) {
          createCardsThenAppend(apiDataStore, index);
        }
      });
    });
  });
}
function countryCards() {
  apiDataStore.forEach((e, index) => {
    createCardsThenAppend(apiDataStore, index);
  });
}
function ScrollTopBottom() {
  // Scroll to Top
  document.getElementById("scrollTop").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Scroll to Bottom
  document
    .getElementById("scrollBottom")
    .addEventListener("click", function () {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    });
}
window.addEventListener("load", () => {
  modes();
  apiCountryFunction();
  ScrollTopBottom();
});
