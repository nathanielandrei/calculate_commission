const fs = require('fs');
const { calculation } = require('./commission/operations');



const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const inputFilePath = () => readline.question(`Enter file name:`, (input) => {
    fs.readFile(`./${input}`, (err, data) => {
        if (err) {
          console.error(err)
          inputFilePath();
        } else {
          const jsonData = JSON.parse(data);
          processData(jsonData);
        }
    });
});

const processData = (data) => {
    const sortedData = sortData(data);
    sortedData.map(value => {
        const result = (calculation[value.type](value)).toFixed(2);
        console.log(result);
    });
}

const sortData = (data) => {
    return data.sort((a, b) => b.date - a.date);
}

inputFilePath();

