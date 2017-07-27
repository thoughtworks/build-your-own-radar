//const sheetLocation = undefined; //e.g. "https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit"
const PredefinedSheetLocation = process.env.PREDEFINED_SHEET_LOCATION || undefined;
module.exports = PredefinedSheetLocation;
