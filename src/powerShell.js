const shell = require('node-powershell');

let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
});

// Get-NetAdapter | Select-Object  InterfaceAlias , InterfaceIndex , Status | ConvertTo-Json
// Set-DnsClientServerAddress -InterfaceIndex 5 -ResetServerAddresses
// Set-DnsClientServerAddress -InterfaceIndex 5 -ServerAddresses ("10.0.0.1","10.0.0.2")

// ps.addCommand('')
// ps.invoke()

async function getNetworks() {
    ps.addCommand('Get-NetAdapter | Select-Object  InterfaceAlias , InterfaceIndex , Status | ConvertTo-Json');
    return ps.invoke();
}

function setDNS_servers(index, DNS1, DNS2) {
    ps.addCommand(`Set-DnsClientServerAddress -InterfaceIndex ${index} -ServerAddresses ("${DNS1}","${DNS2}")`);
    return ps.invoke();
}

function setDNS_Auto(index) {
    ps.addCommand(`Set-DnsClientServerAddress -InterfaceIndex ${index} -ResetServerAddresses`);
    return ps.invoke();
}
