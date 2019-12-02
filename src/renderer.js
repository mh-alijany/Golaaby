import './main.scss';

import 'bootstrap/dist/js/bootstrap.bundle';

var model = require('./fs');
var DNS_resolver = require('./nsLookup');
require('./powerShell');

// init user interface ----------------------------------------------

/**
 * if system is using dns_servers then update status to connected 
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
 * create a table row from dns_info
 * @param {Object} dns_info DNS information such as DNS server addresses and provider name
 * @returns {JQuery} table row
 */
function addRow(dns_info) {
    var $row = $(`<tr><td>options</td><td><span class="badge badge-danger text-light">درحال برسی</span></td><td>${dns_info.name}</td></tr>`);
    // attach dns data to row
    $row.data('id', dns_info.id);
    return $row;
}

/**
 * update latency of the dns servers (in dns table)
 * @param {JQuery} $row table row of dns
 * @param {Array} dns_servers dns servers ip
 */
async function updateLatency($row, dns_servers, id) {
    var latency = await DNS_resolver.measure(dns_servers);

    model.data.DNS_list[id].latency = latency;
    model.store();

    if (latency)
        $row.children().eq(1).html(`<span class="badge badge-success">${latency}</span>`);
    else
        $row.children().eq(1).html('<span class="badge badge-danger">قطع</span>');
}

/**
 * read all dns servers from file then append rows of each them into the table 
 * @todo get table from globals
 */
function addDNSToTable() {
    var tableBody = [];
    var data = model.read();
    for (let id in data.DNS_list) {
        tableBody.push(addRow(data.DNS_list[id]));
    };
    $("#DNS-table").append(tableBody);
}

/**
 * update latency of each dns server
 */
async function updateLatencies() {
    var rows = $("#DNS-table tr");

    for (let i = 0; i < rows.length; i++) {
        let $row = $(rows[i]);
        let id = $row.data('id');
        let dns_info = model.data.DNS_list[id];
        checkDNS(dns_info.DNS_servers, dns_info.name, dns_info.url);
        await updateLatency($row, dns_info.DNS_servers, dns_info.id);
    }
}

/**
 * get dns which has less latency
 *
 * @returns {Number} id of best DNS
 */
function getBestDNS() {
    var min = Infinity;
    var best_id;
    for (const id in model.data.DNS_list) {
        var latency = model.data.DNS_list[id].latency;
        if (latency < min) {
            min = latency;
            best_id = id;
        }
    }
    return best_id;
}

$(".status-non").show();
$(".status-set").hide();
addDNSToTable();
updateLatencies();


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