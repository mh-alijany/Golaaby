const shell = require('node-powershell');

let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
});


export async function getNetworks() {
    return new Promise(resolve => {
        ps.addCommand('Get-NetAdapter | Select-Object  InterfaceAlias , InterfaceIndex , Status | ConvertTo-Json');
        ps.invoke()
            .then(networks => resolve(networks))
            .catch(err => resolve(err));
    });
}

export function setDNS_servers(index, DNS1, DNS2) {
    ps.addCommand(`Set-DnsClientServerAddress -InterfaceIndex ${index} -ServerAddresses ("${DNS1}","${DNS2}")`);
    return ps.invoke();
}

export function setDNS_Auto(index) {
    ps.addCommand(`Set-DnsClientServerAddress -InterfaceIndex ${index} -ResetServerAddresses`);
    return ps.invoke();
}
