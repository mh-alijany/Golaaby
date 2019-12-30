import { useState, useEffect } from 'react';
import { read, write } from './modules/fs';
import useNetwork from './useNetwork';
const isOnline = require('is-online');
const defaultList = require("./defaultList.json");

const data = read("DNS_List", defaultList);

var { getConnectedNetworkInterfaces, getLatency, isSystemDNS_Server, setDNS_Auto, setDNS_ConnectedInterfaces } = require('./kernel');


const useDNS_Info = () => {
    let InterfaceChang = useNetwork();

    // it shows DNS changes whit toggle
    const [HasUpdate, setHasUpdate] = useState(false);

    // all of things which our application should know about DNS  
    const [DNS_Info, setDNS_Info] = useState({
        DNS_List: data,
        ConnectedInterfaces: [],
        BestDNS: false,
        EnableDNS: false,
    });

    // function which components use theme to change DNS info 
    const fn = {
        update: update,
        connect: connect,
        disconnect: disconnect,
        add: add,
        remove: remove,
        edit: edit
    }

    // save changes of DNS info then notify sub component's to update their state
    function saveChanges(useStore) {
        if (useStore)
            write("DNS_List", DNS_Info.DNS_List);
        setDNS_Info(DNS_Info);
        setHasUpdate(HasUpdate => !HasUpdate);
    }

    // connect to specified DNS  
    async function connect(id) {
        if (DNS_Info.ConnectedInterfaces.length === 0) return;

        if (!id) // TODO: can i remove it ? 
            id = DNS_Info.BestDNS;
        await setDNS_ConnectedInterfaces(DNS_Info.DNS_List[id].DNS_servers);  // TODO: check result
        DNS_Info.EnableDNS = id;
        saveChanges();
    }

    // discount from DNS which currently is used
    async function disconnect() {
        if (DNS_Info.ConnectedInterfaces.length === 0) return;
        await setDNS_Auto(); // TODO: check result
        DNS_Info.EnableDNS = false;
        saveChanges();
    }

    // update dsn latency
    async function updateLatency(id) {
        let connected = DNS_Info.ConnectedInterfaces.length > 0;
        let latency = connected && await getLatency(DNS_Info.DNS_List[id].DNS_servers);
        DNS_Info.DNS_List[id].latency = latency;
    }

    // check for dns latency is least
    function checkIsBest(id) {
        var best = DNS_Info.DNS_List[DNS_Info.BestDNS];
        var current = DNS_Info.DNS_List[id].latency;
        if (!DNS_Info.BestDNS || best.latency > current) {
            DNS_Info.BestDNS = id;
        }
    }

    // check for dns is currently is used whit system
    function checkIsEnable(id) {
        let connected = DNS_Info.ConnectedInterfaces.length > 0;

        if (isSystemDNS_Server(DNS_Info.DNS_List[id].DNS_servers)) {
            DNS_Info.EnableDNS = connected && id;
            DNS_Info.DNS_List[id].isEnable = connected && true;
        }
    }

    // add new dns to dns list
    function add(dns) {
        // generate unique id 
        let id = Math.max(...Object.keys(DNS_Info.DNS_List)) + 1;
        dns.id = String(id);
        DNS_Info.DNS_List[id] = dns;
        update(id, true);
    }

    // edit a dns of DNS list
    function edit(id, DNS) {
        // merge whit edited props
        Object.assign(DNS_Info.DNS_List[id], DNS);
        saveChanges(true);
    }

    // remove dns from dns list
    async function remove(id) {
        delete DNS_Info.DNS_List[id];
        // if dns is used by system
        if (id == DNS_Info.EnableDNS)
            DNS_Info.EnableDNS = false;
        saveChanges(true);
    }

    async function checkConnection() {
        var networks = await getConnectedNetworkInterfaces();

        if (await isOnline())
            DNS_Info.ConnectedInterfaces = networks;
        else
            DNS_Info.ConnectedInterfaces = [];
    }

    // update the dns info or all of theme 
    async function update(id, store = false) {
        // update all if id was not specified
        if (!id) {
            updateAll();
            return;
        }
        checkIsEnable(id);
        await updateLatency(id);
        checkIsBest(id);
        saveChanges(store);
    }

    // update all props of DNS_Info 
    async function updateAll() {
        await checkConnection();

        for (const id in DNS_Info.DNS_List) {
            checkIsEnable(id);
            await updateLatency(id);
            checkIsBest(id);
        }

        saveChanges(true);
    }

    // update all if network has been changed
    useEffect(() => {
        update();
    }, [InterfaceChang]);


    return { DNS_Info, HasUpdate, fn };
}

export default useDNS_Info;
