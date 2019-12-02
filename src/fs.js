
var fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/data.json');

export var data = {
    // default dns list
    DNS_list: {
        "1": {
            id: 1,
            name: 'شکن',
            DNS_servers: ['178.22.122.100', '185.51.200.2'],
            icon: '',
            url: 'https://shecan.ir/'
        },
        "2": {
            id: 2,
            name: 'بگذر',
            DNS_servers: ['185.55.226.26', '185.55.226.25'],
            icon: '',
            url: 'https://begzar.ir/'
        }
    }
};

/**
 * read App data from file
 * @export
 * @returns {Object} app data
 */
export function read() {
    if (fs.existsSync(filePath)) {
        var raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    } else
        return data;
}

/**
 * write new data to file
 * @export
 */
export async function store() {
    fs.writeFile(filePath, JSON.stringify(data), function (err) {
        if (err) console.log(err);
    });
}

