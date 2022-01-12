import './style.css';

import { templateloader } from './js/utilities';
import { loadUploaderFeatures } from './js/uploader';

document.addEventListener('DOMContentLoaded', async() => {
  await templateloader('uploader.html');
  loadUploaderFeatures(
    '#form-uploader',
    'search-file',
    '#choosen-files',
    '#download-btn');
});