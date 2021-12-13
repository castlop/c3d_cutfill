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