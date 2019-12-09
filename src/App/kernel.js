import { getNetworks, setDNS_servers, setDNS_auto } from './modules/shell';
import { measure, getDNS_Servers } from './modules/nsLookup'
import { async } from 'q';

export async function getConnectedNetworkInterfaces() {
    let networksJson = await getNetworks();
    let networks = JSON.parse(networksJson);
    let connectedInterfaces = networks.filter((netWork) => netWork.Status == "Up");
    return connectedInterfaces;
}

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

export function setDNS_ManualInterface(DNS_Servers, InterfaceIndex) {
    return setDNS_servers(InterfaceIndex, DNS_Servers[0], DNS_Servers[1]);
}

export function getLatency(DNS_Servers) {
    return measure(DNS_Servers);
}