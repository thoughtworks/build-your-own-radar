const ExceptionMessages = {
  TOO_MANY_QUADRANTS: 'There are more than 4 quadrant names listed in your data. Check the quadrant column for errors.',
  TOO_MANY_RINGS: 'More than 4 rings.',
  MISSING_HEADERS:
    'Document is missing one or more required headers or they are misspelled. ' +
    'Check that your document contains headers for "name", "ring", "quadrant", "isNew", "description".',
  MISSING_CONTENT: 'Document is missing content.',
  LESS_THAN_FOUR_QUADRANTS:
    'There are less than 4 quadrant names listed in your data. Check the quadrant column for errors.',
  SHEET_NOT_FOUND: 'Oops! We can’t find the Google Sheet you’ve entered. Can you check the URL?',
  SHEET_NOT_FOUND_NEW: 'Oops! We can’t find the Google Sheet you’ve entered, please check the URL of your sheet.',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_CONFIG: 'Unexpected number of quadrants or rings. Please check in the configuration.',
  INVALID_JSON_CONTENT: 'Invalid content of JSON file. Please check the content of file.',
  INVALID_CSV_CONTENT: 'Invalid content of CSV file. Please check the content of file.',
}

module.exports = ExceptionMessages
