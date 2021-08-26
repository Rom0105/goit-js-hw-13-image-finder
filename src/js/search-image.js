import { error, alert } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import card from '../templates/card-image.hbs';
import debounce from 'debounce';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import pixHandler from './apiService.js';
import { form, btn, gallery, element, input } from './references.js';

form.addEventListener('submit', pixHandler);
input.addEventListener('input', loadImage);
btn.addEventListener('click', pixHandler);
gallery.addEventListener('click', openModal);

function openModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const img = `<img src= ${event.target.dataset.url}>`;
  const instance = basicLightbox.create(img);

  instance.show();
  window.addEventListener('keydown', closeModal);

  function closeModal(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModal);
    }
  }
}

function alertImage() {
  alert({
    text: 'Type the request!',
    delay: 2000,
  });
}

function markup(image) {
  gallery.insertAdjacentHTML('beforeend', card(image));
}

function loadImage() {
  if (input.value === '') {
    btn.setAttribute('disabled', 'disabled');
    gallery.innerHTML = '';
    alertImage();
  }
  if (input.value !== '') {
    btn.removeAttribute('disabled');
  }
}

function handleButtonClick() {
  element.scrollIntoView({
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

export { errorUsers, handleButtonClick, loadImage, alertImage };
