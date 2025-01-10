const light_mode = document.querySelector(".light-mode");
const dark_mode = document.querySelector(".dark-mode");
const body = document.querySelector("body");
const apiCountry = "https://restcountries.com/v3.1/all";
const cards_folder = document.querySelector(".cards_folder");
const inputDatafetchSearch = document.querySelector(".inputDatafetchSearch");
const svg_back = document.querySelector(".svg-back");
const country_name = document.querySelector(".country_name");
const nativeName = document.querySelector(".native_name");
const populationData = document.querySelector(".population_data");
const regionData = document.querySelector(".region_data");
const subRegionData = document.querySelector(".sub_region_data");
const capitalData = document.querySelector(".capital_data");
const topLevelDomainData = document.querySelector(".topLevelDomain_data");
const currenciesData = document.querySelector(".currencies_data");
const languagesData = document.querySelector(".languages_data");
const country_flag_image = document.querySelector(".country_flag_image");
const borderCountry = document.querySelector(".border-javaScript-country");
let apiDataStore = [];
let inputSearchValue;
function modes() {
  // Apply the saved theme on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.style.backgroundColor = savedTheme === "dark" ? "black" : "white";
    body.style.color = savedTheme === "dark" ? "white" : "black";
    svg_back.style.fill = savedTheme === "dark" ? "white" : "black";
    light_mode.classList.toggle("none", savedTheme === "dark");
    dark_mode.classList.toggle("none", savedTheme === "light");
  }

  // Light mode button
  light_mode.addEventListener("click", () => {
    light_mode.classList.add("none");
    dark_mode.classList.remove("none");
    body.style.backgroundColor = "black";
    body.style.color = "white";
    svg_back.style.fill = "white";
    localStorage.setItem("theme", "dark"); // Save theme as dark
  });

  // Dark mode button
  dark_mode.addEventListener("click", () => {
    dark_mode.classList.add("none");
    light_mode.classList.remove("none");
    body.style.backgroundColor = "white";
    body.style.color = "black";
    svg_back.style.fill = "black";
    localStorage.setItem("theme", "light"); // Save theme as light
  });
}
function clearPreviousOutput() {
  cards_folder.innerHTML = ""; // Clear previous results
}
async function apiCountryFunction() {
  try {
    const response = await fetch(apiCountry);
    const data = await response.json();
    apiDataStore = data;
    vlaueExtract();
  } catch (error) {
    console.error("Error fetching country data:", error);
  }
}
function vlaueExtract() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const countryName = urlParams.get("name");
  console.log(countryName);
  apiDataStore.forEach((e, i) => {
    if (
      apiDataStore[i].name.common.toLowerCase() === countryName.toLowerCase()
    ) {
      console.log(apiDataStore[i]);
      country_flag_image.src = `${apiDataStore[i].flags.png}`;
      country_name.innerText = `${apiDataStore[i].name.common}`;
      nativeName.innerText = `${apiDataStore[i].name.official}`;
      populationData.innerText = `${new Intl.NumberFormat("en-IN").format(
        apiDataStore[i].population
      )}`;
      regionData.innerText = `${apiDataStore[i].region}`;
      subRegionData.innerText = `${apiDataStore[i].subregion}`;
      capitalData.innerText = `${apiDataStore[i].capital}`;
      topLevelDomainData.innerText = `${apiDataStore[i].tld}`;
      if (apiDataStore[i].currencies) {
        const currencies = Object.values(apiDataStore[i].currencies)
          .map((currency) => `${currency.name}`)
          .join(", ");
        currenciesData.innerText = currencies;
      } else {
        currenciesData.innerText = "No currency";
      }

      if (apiDataStore[i].languages) {
        const languages = Object.values(apiDataStore[i].languages)
          .map((lan) => {
            return lan;
          })
          .join(", ");
        languagesData.innerText = `${languages}`;
      } else {
        languagesData.innerText = "No language";
      }
      if (apiDataStore[i].borders) {
        const bordersStore = apiDataStore[i].borders;
        const borderValues = bordersStore
          .map((e) => {
            return e;
          })
          .join(", ");
        borderCountry.innerText = `${borderValues}`;
      }else{
        borderCountry.innerText = `${"Not Share any border"}`;
      }
    }
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
