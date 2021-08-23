import './sass/main.scss';
import { error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import card from './templates/card-image.hbs';
import axios from 'axios';
import debounce from 'debounce';
// import searchImage from './js/apiService.js';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  input: document.querySelector('.input-form'),
};

refs.form.addEventListener('input', debounce(pixHandler, 500));
let currentPage = 1;

function pixHandler(event) {
  event.preventDefault();

  const value = refs.input.value;
  axios
    .get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${currentPage}&per_page=12&key=23040897-f684e552d269990a649c2a9ea`,
    )
    .then(image => markup(image.data.hits))
    .then(() => (currentPage += 1))
    .catch(error => console.error(error));
}

function markup(image) {
  refs.gallery.insertAdjacentHTML('beforeend', card(image));
}

error({
  text: 'No image!',
  delay: 2000,
});
