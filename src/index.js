import './sass/main.scss';
import { error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import card from './templates/card-image.hbs';

const refs = {
  gallery: document.querySelector('.gallery'),
};

refs.gallery.insertAdjacentHTML('beforeend', card);

error({
  text: 'No image!',
  delay: 2000,
});
