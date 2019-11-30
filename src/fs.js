
var fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/data.json');

export var data = {
    // default dns list
    DNS_list: [
        {
            name: 'شکن',
            DNS1: '178.22.122.100',
            DNS2: '185.51.200.2',
            icon: '',
            url: 'https://shecan.ir/'
        },
        {
            name: 'بگذر',
            DNS1: '185.55.226.26',
            DNS2: '185.55.226.25',
            icon: '',
            url: 'https://begzar.ir/'
        }
    ]
};

// read App data
if (fs.existsSync(filePath)) {
    var raw = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(raw);
}

// save App changes
export async function store(items) {
    Object.assign(data, items);
    fs.writeFile(filePath, JSON.stringify(data), function (err) {
        if (err) console.log(err);
    });
}

