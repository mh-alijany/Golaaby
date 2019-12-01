const shell = require('node-powershell');

let ps = new shell({
  executionPolicy: 'Bypass',
  noProfile: true
});

// Get-NetAdapter | Select-Object InterfaceAlias , InterfaceIndex
// Set-DnsClientServerAddress -InterfaceIndex 12 -ResetServerAddresses
// Set-DnsClientServerAddress -InterfaceIndex 12 -ServerAddresses ("10.0.0.1","10.0.0.2")

// ps.addCommand('')
// ps.invoke()