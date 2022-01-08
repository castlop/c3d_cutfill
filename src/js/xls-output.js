const addDataToworksheet = (sheetName, workbook, dataCollection) => {
  let belowAddress = '',
      worksheet = workbook.Sheets[sheetName],
      dataRowIsArray = dataCollection.every(dataRow => Array.isArray(dataRow));
  if (worksheet === undefined) {
    workbook.Sheets[sheetName] = (dataRowIsArray)
      ? XLSX.utils.aoa_to_sheet(dataCollection)
      : XLSX.utils.json_to_sheet(dataCollection);
  } else {
    belowAddress = getBelowAddress(worksheet['!ref']);
    (dataRowIsArray)
      ? XLSX.utils.sheet_add_aoa(worksheet, dataCollection, {origin: belowAddress})
      : XLSX.utils.sheet_add_json(worksheet, dataCollection, {origin: belowAddress});
  }
}

const getBelowAddress = cellAddress => {
  const rowPattern = /[0-9]$/,
        colPattern = /^[A-Z]/;
  let cellRow = cellAddress.match(rowPattern)[0],
      cellCol = cellAddress.match(colPattern)[0];
  return `${cellCol}:${parseInt(cellRow) + 1}`;
}
