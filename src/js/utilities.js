export const templateloader = async (templateName) => {
  const $main = document.querySelector('main');
  let templateContent = await templateReader(templateName);
  $main.innerHTML = '';
  $main.insertAdjacentHTML('afterbegin', templateContent);  
}

const templateReader = async (templateName) => {
  const TEMPLATE_FILEPATH = `../templates/${templateName}`;
  let template = await fetch(TEMPLATE_FILEPATH);
  return await template.text();
}

export const getTablesFromText = (documentText) => {
  let doc = (new DOMParser()).parseFromString(documentText, 'text/html');
  return Array.from(doc.querySelectorAll('table'));
}