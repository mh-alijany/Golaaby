import { getNetworks, setDNS_servers } from './modules/shell';
import { measure } from './modules/nsLookup'
import { async } from 'q';

export async function setDNS_Servers(DNS_Servers) {
    var networksJson = await getNetworks();
    var netInterfaces = JSON.parse(networksJson);
    var connectedInterfaces = netInterfaces.filter((netWork) => netWork.Status == "Up")

    if (connectedInterfaces.length === 0) {
        return false;
    } else {
        var interfaceIndex = connectedInterfaces[0].InterfaceIndex;
        await setDNS_servers(interfaceIndex, DNS_Servers[0], DNS_Servers[1]);
        return true;
    }
}


export function getLatency(DNS_Servers) {
    return measure(DNS_Servers);
}