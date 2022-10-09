// План:
// 1. Сделать разметку списка стран
// 2. Добавить debounce
// 3. Добавить trim()
// 4. Добавить стили
// 5. Вынести фетч.js
// + Вынести рефы.js


import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.searchBox.addEventListener('input', onSearchBoxInput);

function onSearchBoxInput(event) {
    event.preventDefault();
    let name = event.currentTarget.value;

    fetchCountries(name)
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
        .then(data => {
            console.log(data.length)
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                return;
            } 
            const markup = createMarkup(data);
            refs.countryInfo.innerHTML = markup;

    })
        .catch(error => {
            Notiflix.Notify.failure("Oops, there is no country with that name");
            console.log(error);
        });
}

function fetchCountries(name) {
    console.log(name);
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error(response.status);
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     const markup = createMarkup(data);
    //     refs.countryInfo.innerHTML = markup;
    //     console.log(markup)
    // })
    // .catch(error => console.log(error));
}


function createMarkup(data) {
    console.log(data);
    if (data.length <= 10 && data.length >= 2) {
        data.map(country => {
            return `<li>${country.name.official}</li>`
        })
    } else { 
    return `      
    <img src="${data[0].flags.png}" alt="${data[0].name.official} flag" />
    <h2>${data[0].name.official}</h2>
      <ul>
        <li>
          <p><span>Capital:</span>${data[0].capital[0]}</p>

        </li>
        <li>
          <p><span>Population:</span>${data[0].population}</p>

        </li>
        <li>
          <p><span>Languages:</span>${data[0].languages}</p>
  
        </li>
      </ul>`
            }    
}