const path = require('path');
const fs = require('fs');
const markdownIntoHtml = require('markdown-into-html');
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const currentCsvPath = path.join(__dirname, '../radars/WNE_2020_2021.csv')
const csvWriter = createCsvWriter({
    path: currentCsvPath,
    header: [
        {id: 'name', title: 'name'},
        {id: 'quadrant', title: 'quadrant'},
        {id: 'ring', title: 'ring'},
        {id: 'icon', title: 'icon'},
        {id: 'description', title: 'description'}
    ]
});

//Get all of the files in the markdown directory
const markdownDirectory = path.join(__dirname, '../radars/descriptions');
const csvRows = [];

//parse the csv file
fs.createReadStream(currentCsvPath)
  .pipe(csv())
  .on('data', (data) => csvRows.push(data))
  .on('end', async () => {

    await Promise.all(csvRows.map(async row => {
        const mdFile = path.join(markdownDirectory, row.name + ".md");
        try{
            const parsed = await markdownIntoHtml({path: mdFile});
            console.log('Writing ' + row.name);
            row.description = parsed;
        } catch (error) {
            //ignoring errors
        }
    }))

    csvWriter.writeRecords(csvRows)
    .then(() => {
        console.log('done');
    });
  });

