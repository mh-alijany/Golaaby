import { useState, useEffect } from 'react';
import { defaultData } from './globals';

var { getConnectedNetworkInterfaces, getLatency, isSystemDNS_Server, setDNS_Auto, setDNS_ConnectedInterfaces } = require('./kernel');


const useDNS_Info = () => {
    const [DNS_Info, setDNS_Info] = useState({
        DNS_List: defaultData.DNS_list,
        ConnectedInterfaces: [],
        BestDNS: false,
        EnableDNS: false,
    });

    const [HasUpdate, setHasUpdate] = useState(false);

    async function setEnable(id) {
        if (!id)
            id = DNS_Info.BestDNS;
        await setDNS_ConnectedInterfaces(DNS_Info.DNS_List[id].DNS_servers);
        DNS_Info.EnableDNS = id;
        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    async function disable() {
        await setDNS_Auto();
        DNS_Info.EnableDNS = false;
        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    async function updateLatency(id) {
        var latency = await getLatency(DNS_Info.DNS_List[id].DNS_servers);
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
        if (isSystemDNS_Server(DNS_Info.DNS_List[id].DNS_servers)) {
            DNS_Info.EnableDNS = id;
            DNS_Info.DNS_List[id].isEnable = true;
        }
    }

    function add(dns) {
        let id = Math.max(...Object.keys(DNS_Info.DNS_List)) + 1;
        dns.id = String(id);
        DNS_Info.DNS_List[id] = dns;
        // setDNS_Info(DNS_Info);
        // setHasUpdate(!HasUpdate);
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
        for (const id in DNS_Info.DNS_List) {
            checkIsEnable(id);
            await updateLatency(id);
            checkIsBest(id);
        }

        var networks = await getConnectedNetworkInterfaces();
        DNS_Info.ConnectedInterfaces = networks;

        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    useEffect(() => {
        updateAll();
    }, []);


    return { DNS_Info, HasUpdate, setEnable, disable, update, remove, edit, add };
}

export default useDNS_Info;
