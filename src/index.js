import './css/styles.css';
import Notiflix from 'notiflix';
import { refs } from './references';
import { createCountryInfoMarkup } from './createMarkup';
import { createCountryListMarkup } from './createMarkup';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(event) {
  let name = event.target.value.trim();
  const { countryList, countryInfo } = refs;
  if (name === '') {
    clearMarkup(countryList);
    clearMarkup(countryInfo);
    return;
  }

  fetchCountries(name)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );

        return;
      } else if (data.length >= 2 && data.length <= 10) {
        const markup = createCountryListMarkup(data);
        countryList.innerHTML = markup;
        clearMarkup(countryInfo);
        return;
      } else {
        const markup = createCountryInfoMarkup(data);
        countryInfo.innerHTML = markup;
        clearMarkup(countryList);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}

function clearMarkup(direction) {
  direction.innerHTML = '';
}
