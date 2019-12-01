import './main.scss';

import 'bootstrap/dist/js/bootstrap.bundle';

var { store, data } = require('./fs');
var { measure, getDNS_Servers } = require('./nsLookup');
require('./powerShell');

// init user interface ----------------------------------------------

// update status according to system current dns 
function checkDNS(dns_servers, name, url) {
    var currentDNS_servers = getDNS_Servers();
    if (currentDNS_servers.every(item => dns_servers.includes(item))) {
        $(".status-non").hide();
        $(".status-set").show();
        $('#link').html(`<a href="${url}" target="_blank">${name}</a>`);
    }
}

// create a table row for a DNS
function addRow(dns) {
    var row = $(`<tr><td>options</td><td><span class="badge badge-warning">درحال برسی</span></td><td>${dns.name}</td></tr>`);

    // attach dns data to row
    row.data('data', { name: dns.name, url: dns.url, DNS_servers: [dns.DNS1, dns.DNS2] });
    return row;
}

// update latency of an dns row
async function updateRow($el, dns_servers) {
    var latency = await measure(dns_servers);
    if (latency)
        $el.children().eq(1).html(`<span class="badge badge-success">${latency}</span>`)
    else
        $el.children().eq(1).html('<span class="badge badge-danger">قطع</span>')
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
        let $el = $(rows[i]);
        let info = $el.data('data');
        checkDNS(info.DNS_servers, info.name, info.url);
        await updateRow($el, info.DNS_servers);
    }
}

$(".status-non").show();
$(".status-set").hide();
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