const getBelowAddress = cellAddress => {
  const rowPattern = /[0-9]$/,
        colPattern = /^[A-Z]/;
  let cellRow = cellAddress.match(rowPattern)[0],
      cellCol = cellAddress.match(colPattern)[0];
  return `${cellCol}:${parseInt(cellRow) + 1}`;
}
