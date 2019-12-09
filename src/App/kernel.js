import { getNetworks, setDNS_servers } from './modules/shell';
import { measure } from './modules/nsLookup'
import { async } from 'q';

export function getConnectedNetworkInterfaces() {
    let networksJson = await getNetworks();
    let netInterfaces = JSON.parse(networksJson);
    let connectedInterfaces = netInterfaces.filter((netWork) => netWork.Status == "Up");
    return connectedInterfaces;
}

export async function setDNS_ConnectedInterfaces(DNS_Servers) {
    let connectedInterfaces = await getConnectedNetworkInterfaces();
    for (const network of connectedInterfaces) {
        await setDNS_servers(network.InterfaceIndex, DNS_Servers[0], DNS_Servers[1]);
    }
    return true;
}

export function setDNS_ManualInterfaces(DNS_Servers, InterfaceIndex) {
    return setDNS_servers(InterfaceIndex, DNS_Servers[0], DNS_Servers[1]);
}

export function getLatency(DNS_Servers) {
    return measure(DNS_Servers);
}