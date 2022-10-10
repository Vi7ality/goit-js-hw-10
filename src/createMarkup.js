export function createCountryListMarkup(data) {
  return data
    .map(({ name, flags }) => {
      return `<li style="display: flex; align-items: center;">
    <img src="${flags.svg}" alt="${name.official} flag" width="20">
      <p>${name.official}</p></li>`;
    })
    .join('');
}

export function createCountryInfoMarkup(data) {
  const languages = Object.values(data[0].languages).join(', ');
  return `      
<div style="display: flex; align-items: center;">
        <img src="${data[0].flags.svg}" alt="${data[0].name.official} flag" width="20" height="100%"/>
        <h2>${data[0].name.official}</h2>
      </div>

      <ul style="list-style: none; padding-left: 0;">
        <li>
          <p>
            <span style="font-weight: 700">Capital: </span>${data[0].capital[0]}
          </p>
        </li>
        <li>
          <p><span style="font-weight: 700">Population: </span>${data[0].population}</p>
        </li>
        <li>
          <p><span style="font-weight: 700">Languages: </span>${languages}</p>
        </li>`;
}
