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
  btn: document.querySelector('.btn'),
  element: document.getElementById('my-element-selector'),
};

refs.form.addEventListener('input', debounce(pixHandler, 1000));
refs.btn.addEventListener('click', pixHandler);
let currentPage = 1;

function pixHandler(event) {
  event.preventDefault();

  const value = refs.input.value;
  if (value === '') {
    currentPage = 0;
  } else {
    currentPage += 1;
  }

  handleButtonClick();
  loadImage();

  axios
    .get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${currentPage}&per_page=12&key=23040897-f684e552d269990a649c2a9ea`,
    )
    .then(image => errorUsers(image))
    .then(() => (currentPage += 1))
    .catch(error => console.error(error));
}

function markup(image) {
  refs.gallery.insertAdjacentHTML('beforeend', card(image));
}

function loadImage() {
  if (refs.input.value === '') {
    refs.btn.setAttribute('disabled', 'disabled');
    refs.gallery.innerHTML = '';
  }
  if (refs.input.value !== '') {
    refs.btn.removeAttribute('disabled');
  }
}

function handleButtonClick() {
  refs.element.scrollIntoView({
    inline: 'nearest',
    behavior: 'smooth',
    block: 'end',
  });
}

function errorUsers(image) {
  if (image.data.hits) {
    markup(image.data.hits);
  }
  if (image.data.total === 0) {
    error({
      text: 'No image!',
      delay: 2000,
    });
  }
}
