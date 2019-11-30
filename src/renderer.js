import './main.scss';

import 'bootstrap/dist/js/bootstrap.bundle';

var { store, data } = require('./fs');
var { measure } = require('./nsLookup');

// init user interface ----------------------------------------------

// create a table row for a DNS
function addRow(dns) {
    var row = $(`<tr><td>options</td><td><span class="badge badge-warning">درحال برسی</span></td><td>${dns.name}</td></tr>`);

    // attach dns data to row
    row.data('data', { id: dns.name, DNS_servers: [dns.DNS1, dns.DNS2] });
    return row;
}

async function updateRow($el) {
    var dns_servers = $el.data('data').DNS_servers;
    var latency = await measure(dns_servers);
    if (latency)
        $el.children().eq(1).html(`<span class="badge badge-success">${latency}</span>`)
    else
        $el.children().eq(1).html('<span class="badge badge-warn">قطع</span>')
}

// append rows of DNS to table body
function addDNSToTable() {
    var tableBody = [];
    data.DNS_list.forEach(dns => {
        tableBody.push(addRow(dns));
    });
    $("#DNS-table").append(tableBody);
}

// update latency of each dns row
async function updateDNS_State() {
    var rows = $("#DNS-table tr")

    for (let i = 0; i < rows.length; i++) {
        await updateRow($(rows[i]));
    }
}

addDNSToTable();
updateDNS_State()


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