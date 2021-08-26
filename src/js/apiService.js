import axios from 'axios';
import { input } from './references.js';
import { errorUsers, handleButtonClick } from './search-image.js';

const BASE_URL = 'https://pixabay.com/api';
const key = '23040897-f684e552d269990a649c2a9ea';
let page = 1;
let perPage = 12;
page += 1;
export default function pixHandler(event) {
  event.preventDefault();

  const value = input.value;
  page = 1;

  handleButtonClick();

  axios
    .get(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=${perPage}&key=${key}`,
    )
    .then(image => errorUsers(image))
    // .then(() => (page += 1))
    .catch(error => console.log(error));
  page += 1;
}
