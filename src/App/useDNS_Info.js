import { useState, useEffect } from 'react';
import { defaultData } from './globals';

var { getConnectedNetworkInterfaces, getLatency, isSystemDNS_Server, setDNS_Auto, setDNS_ConnectedInterfaces } = require('./kernel');


const useDNS_Info = () => {
    const [DNS_Info, setDNS_Info] = useState({
        DNS_List: defaultData.DNS_list,
        ConnectedInterfaces: [],
        BestDNS: false,
        EnableDNS: false,
        update: update,
        connect: connect,
        disconnect: disconnect,
        add: add,
        remove: remove,
        edit: edit
    });

    const [HasUpdate, setHasUpdate] = useState(false);

    function setEnable(id) {
        if (DNS_Info.EnableDNS)
            DNS_Info.DNS_List[DNS_Info.EnableDNS].isEnable = false;
        DNS_Info.EnableDNS = id;
        if (id)
            DNS_Info.DNS_List[id].isEnable = true;
    }

    async function connect(id) {
        if (DNS_Info.ConnectedInterfaces.length === 0) return;

        if (!id)
            id = DNS_Info.BestDNS;
        await setDNS_ConnectedInterfaces(DNS_Info.DNS_List[id].DNS_servers);
        setEnable(id);
        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    async function disconnect() {
        if (DNS_Info.ConnectedInterfaces.length === 0) return;

        await setDNS_Auto();
        setEnable(false);
        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    async function updateLatency(id) {
        let connected = DNS_Info.ConnectedInterfaces.length > 0;
        let latency = connected && await getLatency(DNS_Info.DNS_List[id].DNS_servers);
        DNS_Info.DNS_List[id].latency = latency;
    }

    function checkIsBest(id) {
        var best = DNS_Info.DNS_List[DNS_Info.BestDNS];
        var current = DNS_Info.DNS_List[id].latency;
        if (!DNS_Info.BestDNS || best > current) {
            DNS_Info.BestDNS = id;
        }
    }

    function checkIsEnable(id) {
        let connected = DNS_Info.ConnectedInterfaces.length > 0;
        if (isSystemDNS_Server(DNS_Info.DNS_List[id].DNS_servers)) {
            DNS_Info.EnableDNS = connected && id;
            DNS_Info.DNS_List[id].isEnable = connected && true;
        }
    }

    function add(dns) {
        let id = Math.max(...Object.keys(DNS_Info.DNS_List)) + 1;
        dns.id = String(id);
        DNS_Info.DNS_List[id] = dns;
        update(id);
    }

    function edit(id, DNS) {
        Object.assign(DNS_Info.DNS_List[id], DNS);
        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    async function remove(id) {
        delete DNS_Info.DNS_List[id];
        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    async function update(id) {
        if (!id) {
            updateAll();
            return;
        }
        checkIsEnable(id);
        await updateLatency(id);
        checkIsBest(id);

        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    async function updateAll() {
        var networks = await getConnectedNetworkInterfaces();
        DNS_Info.ConnectedInterfaces = networks;

        for (const id in DNS_Info.DNS_List) {
            checkIsEnable(id);
            await updateLatency(id);
            checkIsBest(id);
        }

        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    useEffect(() => {
        updateAll();
    }, []);


    return { DNS_Info, HasUpdate };
}

export default useDNS_Info;
