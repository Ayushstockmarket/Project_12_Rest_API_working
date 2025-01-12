const light_mode=document.querySelector(".light-mode");const dark_mode=document.querySelector(".dark-mode");const body=document.querySelector("body");const apiCountry="https://restcountries.com/v3.1/all";const cards_folder=document.querySelector(".cards_folder");const inputDatafetchSearch=document.querySelector(".inputDatafetchSearch");const borderCountry=document.querySelector('.border-javaScript-country');let apiDataStore=[];let inputSearchValue;function modes(){const savedTheme=localStorage.getItem("theme");if(savedTheme){body.style.backgroundColor=savedTheme==="dark"?"black":"white";body.style.color=savedTheme==="dark"?"white":"black";light_mode.classList.toggle("none",savedTheme==="dark");dark_mode.classList.toggle("none",savedTheme==="light")}
light_mode.addEventListener("click",()=>{light_mode.classList.add("none");dark_mode.classList.remove("none");body.style.backgroundColor="black";body.style.color="white";localStorage.setItem("theme","dark")});dark_mode.addEventListener("click",()=>{dark_mode.classList.add("none");light_mode.classList.remove("none");body.style.backgroundColor="white";body.style.color="black";localStorage.setItem("theme","light")})}
function clearPreviousOutput(){cards_folder.innerHTML=""}
function createCardsThenAppend(apiDataStore,index){const createAnchorThenAppend=document.createElement("a");createAnchorThenAppend.classList.add("anchor_cards");createAnchorThenAppend.setAttribute("href",`./fullPage.html?name=${apiDataStore[index].name.common}`);createAnchorThenAppend.innerHTML=`
                            <div class="country-image">
                                <img class="country-images-png" loading="lazy" src="${
                                  apiDataStore[index].flags.png
                                }"alt="">
                              </div>
                            <div class="country-data">
                                <h1 class="country_card_data_row-1">${
                                  apiDataStore[index].name.common
                                }</h1>
                                <p class="country_card_data_row-2">
                                    <strong class="Population">Population:</strong>
                                    <span class="Population-data">${new Intl.NumberFormat(
                                      "en-IN"
                                    ).format(
                                      apiDataStore[index].population
                                    )}</span>
                                </p>
                                <p class="country_card_data_row-2">
                                    <strong class="Region">Region:</strong>
                                    <span class="Region-data">${
                                      apiDataStore[index].region
                                    }</span>
                                </p>
                                <p class="country_card_data_row-3">
                                    <strong class="Capital">Capital:</strong>
                                    <span class="Capital-data">${
                                      apiDataStore[index].capital
                                    }</span>
                                </p>
                            </div>`;cards_folder.appendChild(createAnchorThenAppend)}
async function apiCountryFunction(){try{const response=await fetch(apiCountry);const data=await response.json();apiDataStore=data;countryCards();inputDataStore();filterBaseOnRegion()}catch(error){console.error("Error fetching country data:",error)}}
function inputDataStore(){inputDatafetchSearch.addEventListener("input",()=>{inputSearchValue=inputDatafetchSearch.value.toLowerCase();clearPreviousOutput();apiDataStore.forEach((e,index)=>{if(apiDataStore[index].name.common.toLowerCase().includes(inputSearchValue)){createCardsThenAppend(apiDataStore,index)}})})}
function filterBaseOnRegion(){apiDataStore.forEach((e,index)=>{const filterData=document.querySelector("#filter");filterData.addEventListener("change",()=>{clearPreviousOutput();apiDataStore.forEach((e,index)=>{if(apiDataStore[index].region.toLowerCase()===filterData.value.toLowerCase()){createCardsThenAppend(apiDataStore,index)}})})})}
function countryCards(){apiDataStore.forEach((e,index)=>{createCardsThenAppend(apiDataStore,index)})}
function ScrollTopBottom(){document.getElementById("scrollTop").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth",})});document.getElementById("scrollBottom").addEventListener("click",function(){window.scrollTo({top:document.body.scrollHeight,behavior:"smooth",})})}
window.addEventListener("load",()=>{modes();apiCountryFunction();ScrollTopBottom()})
