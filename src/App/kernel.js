import { getNetworks, setDNS_servers, setDNS_auto } from './modules/shell';
import { measure, getDNS_Servers } from './modules/nsLookup'

export async function getAllNetworkInterfaces() {
    let networksJson = await getNetworks();
    return JSON.parse(networksJson);
}

export async function getConnectedNetworkInterfaces() {
    let interfaces = await getAllNetworkInterfaces()
    let connectedInterfaces = interfaces.filter((netWork) => netWork.Status == "Up");
    return connectedInterfaces;
}

// update DNS server of all connected interfaces
export async function setDNS_ConnectedInterfaces(DNS_Servers) {
    let connectedInterfaces = await getConnectedNetworkInterfaces();
    for (const network of connectedInterfaces) {
        await setDNS_servers(network.InterfaceIndex, DNS_Servers[0], DNS_Servers[1]);
    }
}

export function isSystemDNS_Server(dns_servers) {
    var systemDNS_servers = getDNS_Servers();
    return systemDNS_servers.every(item => dns_servers.includes(item))
}

export async function setDNS_Auto() {
    var newtWorks = await getConnectedNetworkInterfaces();
    return setDNS_auto(newtWorks[0].InterfaceIndex);
}

// set DNS server of specified interface by interface index
export function setDNS_ManualInterface(DNS_Servers, InterfaceIndex) {
    return setDNS_servers(InterfaceIndex, DNS_Servers[0], DNS_Servers[1]);
}

export function getLatency(DNS_Servers) {
    return measure(DNS_Servers);
}