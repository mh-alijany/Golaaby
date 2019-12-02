import './main.scss';

import 'bootstrap/dist/js/bootstrap.bundle';

var model = require('./fs');
var DNS_resolver = require('./nsLookup');
require('./powerShell');

// init user interface ----------------------------------------------

/**
 * if system current dns equals dns_servers then update status to connected 
 * @param {Array} dns_servers dns servers ip 
 * @param {String} name provider of dns_servers
 * @param {String} url provider website 
 */
function checkDNS(dns_servers, name, url) {
    var currentDNS_servers = DNS_resolver.getDNS_Servers();
    if (currentDNS_servers.every(item => dns_servers.includes(item))) {
        $(".status-non").hide();
        $(".status-set").show();
        $('#link').html(`<a href="${url}" target="_blank">${name}</a>`);
    }
}

/**
 * create a table row from a dns_info
 * @param {Object} dns_info DNS information such as ip addresses and provider name
 * @returns {JQuery} table row
 */
function addRow(dns_info) {
    var row = $(`<tr><td>options</td><td><span class="badge badge-danger text-light">درحال برسی</span></td><td>${dns_info.name}</td></tr>`);
    // attach dns data to row
    row.data('data', { name: dns_info.name, url: dns_info.url, DNS_servers: [dns_info.DNS1, dns_info.DNS2] });
    return row;
}

/**
 * update latency of the dns (in dns table)
 * @param {JQuery} $row table row of dns
 * @param {Array} dns_servers dns servers ip
 */
async function updateRow($row, dns_servers) {
    var latency = await DNS_resolver.measure(dns_servers);
    if (latency)
        $row.children().eq(1).html(`<span class="badge badge-success">${latency}</span>`)
    else
        $row.children().eq(1).html('<span class="badge badge-danger">قطع</span>')
}

/**
 * read all dns servers from file then append rows of each them into the table 
 * @todo convert data.DNS_list to DATA read dns list and add table to params
 */
function addDNSToTable() {
    var tableBody = [];
    data = model.read();
    data.DNS_list.forEach(dns => {
        tableBody.push(addRow(dns));
    });
    $("#DNS-table").append(tableBody);
}

/**
 * update latency of each dns server
 */
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