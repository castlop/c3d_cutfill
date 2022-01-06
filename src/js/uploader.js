import { getTablesFromText, fromTableToObjects } from './utilities.js';

export const library = [];

export const loadUploaderFeatures = (formSelector, inputName, fileListSelector) => {
  const $form = document.querySelector(formSelector),
        $input = $form[inputName];
  
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
    library.push(tables.map(fromTableToObjects));
  });
  reader.readAsText(file);
}

const validateFile = file => {
  const ALLOWED_FILES = ['text/html'];
  return ALLOWED_FILES.includes(file.type);
}