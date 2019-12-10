const PowerShell = require("powershell");

/**
 * Retrieves Interface Alias , Interface Index and Status of each network adapter 
 * @export
 * @returns {Promise} that fulfills with the output of command or rejects with an error
 */
export function getNetworks() {
    return new Promise((resolve) => {
        var ps = new PowerShell('Get-NetAdapter | Select-Object  InterfaceAlias , InterfaceIndex , Status | ConvertTo-Json');
        ps.on("output", data => {
            resolve(data);
        });
    });
}

/**
 * set the DNS server addresses on an adopter using a specified index value.
 * @export
 * @param {Number} index Interface Index of a network adaptor
 * @param {String} DNS1 preferred DNS server
 * @param {String} DNS2 alternative DNS server
 * @returns {Promise} that fulfills with the output of command or rejects with an error
 */
export function setDNS_servers(index, DNS1, DNS2) {
    return new Promise((resolve) => {
        var ps = new PowerShell(`Set-DnsClientServerAddress -InterfaceIndex ${index} -ServerAddresses ("${DNS1}","${DNS2}")`);
        ps.on("output", data => {
            resolve(data);
        });
    });
}

/**
 * Obtain DNS servers automatically.
 * @export
 * @param {Number} index Interface Index of a network adaptor
 * @returns {Promise} that fulfills with the output of command or rejects with an error
 */
export function setDNS_auto(index) {
    return new Promise((resolve) => {
        var ps = new PowerShell(`Set-DnsClientServerAddress -InterfaceIndex ${index} -ResetServerAddresses`);
        ps.on("output", data => {
            resolve(data);
        });
    });
    
}
