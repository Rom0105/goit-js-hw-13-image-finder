import axios from 'axios';
import { input, gallery } from './references.js';
import { errorUsers, handleButtonClick, loadImage, alertImage } from './search-image.js';

const BASE_URL = 'https://pixabay.com/api';
const key = '23040897-f684e552d269990a649c2a9ea';

let currentPage = 0;
let loader = false;

export default function pixHandler(event) {
  event.preventDefault();

  const value = input.value;
  loader = true;

  if (value !== '') {
    currentPage += 1;
  }

  handleButtonClick();
  loadImage();

  axios
    .get(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${value}&page=${currentPage}&per_page=12&key=${key}`,
    )
    .then(image => errorUsers(image))
    .then(() => {
      if (value === '') {
        loader = false;
        gallery.innerHTML = '';
        currentPage = 0;
        alertImage();
      }
    })
    .catch(error => console.log(error));
}
