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

export const fromTableToObjects = (tableElement) => {
  const $rows = Array.from(tableElement.querySelectorAll('tr'));
  let dataTable = [],
      rowsByGroup = {};
  rowsByGroup = groupTableRowsByNodeType($rows);
  if (rowsByGroup.headRows.length < 1) {
    dataTable = rowsToArrays(rowsByGroup.dataRows);
  } else if (rowsByGroup.headRows.length === 1 ) {
    dataTable = rowsToObjects(rowsByGroup);
  }
  return dataTable;
}

const groupTableRowsByNodeType = $tableRows => {
  const groupRows = {headRows: [], dataRows: []};
  $tableRows.forEach($tableRow => {
    if ($tableRow < 1) return;
    let $headerCells = Array
                        .from($tableRow.cells)
                        .filter($cell => $cell.nodeName === 'TH');
    ($headerCells.length > 0 && $headerCells.length === $tableRow.cells.length)
      ? groupRows.headRows.push($tableRow)
      : groupRows.dataRows.push($tableRow);
  });
  return groupRows;
}

const rowsToArrays = rows => {
  return rows
          .filter(row => row.cells.length > 0)
          .map(row => Array.from(row.cells).map(cell => cell.textContent));
}

const rowsToObjects = ({headRows, dataRows}) => {
  let dataBinded = [];
  dataRows.forEach($row => {
    let rowBinded = {};
    Array.from($row.cells).forEach((data, index) => {
      rowBinded[headRows[0].cells[index].textContent] = data.textContent
    });
    dataBinded.push(rowBinded);
  });
  return dataBinded;
}
