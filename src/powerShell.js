const shell = require('node-powershell');

let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
});

/**
 * Retrieves Interface Alias , Interface Index and Status of each network adapter 
 * @export
 * @returns {Promise} that fulfills with the output of command or rejects with an error
 */
export function getNetworks() {
    ps.addCommand('Get-NetAdapter | Select-Object  InterfaceAlias , InterfaceIndex , Status | ConvertTo-Json');
    return ps.invoke();
}

/**
 * set the DNS server addresses on an adopter using a specified index value.
 * @export
 * @param {Number} index Interface Index of a network adaptor
 * @param {String} DNS1 preferred DNS server
 * @param {String} DNS2 alternative DNS server
 * @returns {Promise} that fulfills with rejects with an error
 */
export function setDNS_servers(index, DNS1, DNS2) {
    ps.addCommand(`Set-DnsClientServerAddress -InterfaceIndex ${index} -ServerAddresses ("${DNS1}","${DNS2}")`);
    return ps.invoke();
}

/**
 * Obtain DNS servers automatically.
 * @export
 * @param {Number} index Interface Index of a network adaptor
 * @returns {Promise} that fulfills with rejects with an error
 */
export function setDNS_Auto(index) {
    ps.addCommand(`Set-DnsClientServerAddress -InterfaceIndex ${index} -ResetServerAddresses`);
    return ps.invoke();
}
