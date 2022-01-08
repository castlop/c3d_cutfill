import { getTablesFromText, fromTableToObjects } from './utilities.js';

export const library = {};
let expectedNumberOfFiles = 0,
    uploadedNumberOfFiles = 0;

export const loadUploaderFeatures = (
    formSelector,
    inputName,
    fileListSelector,
    downloadBtnSelector) => {
  const $form = document.querySelector(formSelector),
        $input = $form[inputName],
        $downloadBtn = document.querySelector(downloadBtnSelector);
  
  $form.addEventListener('input', e => {
    let files = Array.from($input.files);

    e.preventDefault();
    if (e.target === $input) {
      if (files.length > 0) {
        renderFiles(fileListSelector, files)
      }
    }
  });

  $form.addEventListener('submit', e => {
    let files = Array.from($input.files),
        validFiles = [];

    e.preventDefault();
    validFiles = files.filter(file => validateFile(file) === true);
    expectedNumberOfFiles = validFiles.length;
    validFiles.map(readFile);
  });
}

const renderFiles = (containerSelector, files) => {
  const $container = document.querySelector(containerSelector),
        $fragment = document.createDocumentFragment() ;
  
  $container.innerHTML = '';
  files.forEach(({name, size}) => {
    let $li = document.createElement('li'),
        $filename = document.createElement('p'),
        $filesize = document.createElement('p');
    $filename.textContent = name;
    $filesize.textContent = `${size / 1084} KB`;
    $li.appendChild($filename);
    $li.appendChild($filesize);
    $fragment.appendChild($li);
    $container.appendChild($fragment);
  });
}

const readFile = file => {
  let reader = new FileReader();
  
  reader.addEventListener('load', e => {
    let tables = getTablesFromText(e.target.result);
    library[file.name] = tables.map(fromTableToObjects);
    uploadedNumberOfFiles++;
    if (expectedNumberOfFiles === uploadedNumberOfFiles) {
      const $downloadBtn = document.querySelector('#download-btn');
      $downloadBtn.removeAttribute('disabled');
    }   
  });
  reader.readAsText(file);
}

const validateFile = file => {
  const ALLOWED_FILES = ['text/html'];
  return ALLOWED_FILES.includes(file.type);
}