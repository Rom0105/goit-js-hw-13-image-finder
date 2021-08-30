import { error, alert } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import card from '../templates/card-image.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { pixHandler } from './apiService.js';
import { form, btn, gallery, element, input, load } from './references.js';

const option = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(loadMore, option);

const state = {
  page: 1,
  query: '',
};
form.addEventListener('submit', onSearch);
input.addEventListener('input', loadImage);
btn.addEventListener('click', onLoadMore);
gallery.addEventListener('click', openModal);
load.addEventListener('click', loadMore);
load.style.visibility = 'hidden';

function onSearch(e) {
  e.preventDefault();
  state.page = 1;
  state.query = e.currentTarget.elements.query.value.trim();
  pixHandler(state.query, state.page).then(({ data: { hits } }) => {
    gallery.innerHTML = card(hits);
    handleButtonClick();
    if (hits.length > 11) {
      load.style.visibility = 'visible';
    }
    if (hits.length === 0) {
      error({
        text: 'No image!',
        delay: 2000,
      });
    }
    if (input.value === '') {
      gallery.innerHTML = '';
      load.style.visibility = 'hidden';
      alertImage();
    }
  });
  btn.setAttribute('disabled', 'disabled');
}

function onLoadMore() {
  state.page = 1;
  pixHandler(input.value, state.page).then(({ data: { hits } }) => {
    gallery.innerHTML = card(hits);
    handleButtonClick();
    if (hits.length > 11) {
      load.style.visibility = 'visible';
    }
    if (hits.length === 0) {
      error({
        text: 'No image!',
        delay: 2000,
      });
    }
  });
  btn.setAttribute('disabled', 'disabled');
}

function loadMore() {
  state.page += 1;
  pixHandler(input.value, state.page).then(({ data: { hits } }) => {
    gallery.insertAdjacentHTML('beforeend', card(hits));
    handleButtonClick();
    if (state.page === 2) {
      observer.observe(load);
    }
    if (input.value === '') {
      gallery.innerHTML = '';
      alertImage();
    }
  });
}

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

function loadImage() {
  if (input.value === '') {
    btn.setAttribute('disabled', 'disabled');
    gallery.innerHTML = '';
    load.style.visibility = 'hidden';
    alertImage();
  }
  if (input.value !== '') {
    btn.removeAttribute('disabled');
  }
}

function handleButtonClick() {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}
