import csv from 'csvtojson';
import fs from 'fs';

const csvFilePath = './csv/test.csv';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream('file.txt');

readStream
  .on('error', (error) => {
    console.log('read error', error);
  })
  .pipe(csv())
  .pipe(writeStream)
  .on('error', (error) => {
    console.log('write error', error);
  })