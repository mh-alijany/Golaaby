import './main.scss';

import 'bootstrap/dist/js/bootstrap.bundle';

var { store, data } = require('./fs');
require('./nsLookup');

// init user interface ----------------------------------------------

// create a table row for a DNS
function makeRow(dns) {
    var row = $(`<tr><td>options</td><td><span class="badge badge-warning">درحال برسی</span></td>
            <td>درحال برسی</td><td>${dns.name}</td></tr>`);

    // attach dns data to row
    row.data('data', { id: dns.name, DNS1: dns.DNS1, DNS2: dns.DNS2 });
    return row;
}

// append rows of DNS to table body
function addDNSToTable() {
    var tableBody = [];
    data.DNS_list.forEach(dns => {
        tableBody.push(makeRow(dns));
    });
    $("#DNS-table").append(tableBody);
}

addDNSToTable()

// const { remote } = require('electron');
// const { BrowserWindow } = remote;
// document.querySelector(".green").addEventListener("click", function (e) {
//     var window = BrowserWindow.getFocusedWindow();
//     window.minimize();
// });
// document.querySelector(".yellow").addEventListener("click", function (e) {
//     var window = BrowserWindow.getFocusedWindow();
//     window.isMaximized() ? window.unmaximize() : window.maximize();
// });
// document.querySelector(".red").addEventListener("click", function (e) {
//     var window = BrowserWindow.getFocusedWindow();
//     window.close();
// });  