
var fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/data.json');

/**
 * read App data from file
 * @export
 * @param {Any} data return if file not exist
 * @returns {Object} app data
 */
export function read(data) {
    if (fs.existsSync(filePath)) {
        var raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    } else
        return data;
}

/**
 * write new data to file
 * @param {Any} data data to write in file
 * @export
 */
export async function store(data) {
    fs.writeFile(filePath, JSON.stringify(data), function (err) {
        if (err) console.log(err);
    });
}

