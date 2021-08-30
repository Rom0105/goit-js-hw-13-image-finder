import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const key = '23040897-f684e552d269990a649c2a9ea';
let perPage = 12;
export function pixHandler(query, page) {
  return axios.get(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${perPage}&key=${key}`,
  );
}
