import { getNetworks, setDNS_servers } from './modules/shell';
import { measure } from './modules/nsLookup'
import { async } from 'q';

export async function getAllNetworkInterfaces(){
    let networksJson = await getNetworks();
    return JSON.parse(networksJson);
}

export async function getConnectedNetworkInterfaces() {
    let interfaces = await getAllNetworkInterfaces()
    let connectedInterfaces = interfaces.filter((netWork) => netWork.Status == "Up");
    return connectedInterfaces;
}

export async function setDNS_ConnectedInterfaces(DNS_Servers) {
    let connectedInterfaces = await getConnectedNetworkInterfaces();
    for (const network of connectedInterfaces) {
        await setDNS_servers(network.InterfaceIndex, DNS_Servers[0], DNS_Servers[1]);
    }
}

export function setDNS_ManualInterface(DNS_Servers, InterfaceIndex) {
    return setDNS_servers(InterfaceIndex, DNS_Servers[0], DNS_Servers[1]);
}

export function getLatency(DNS_Servers) {
    return measure(DNS_Servers);
}