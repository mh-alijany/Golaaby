import { useState, useEffect } from 'react';
import { defaultData } from './globals';
import { async } from 'q';
var { getConnectedNetworkInterfaces, getLatency, isSystemDNS_Server } = require('./kernel');


const useDNS_Info = () => {
    const [DNS_Info, setDNS_Info] = useState({
        DNS_List: defaultData.DNS_list,
        ConnectedInterfaces: [],
        BestDNS: false,
        EnableDNS: false,
    });

    const [HasUpdate, setHasUpdate] = useState(false);

    async function updateDNS(id) {
        var latency = await getLatency(DNS_Info.DNS_List[id].DNS_servers);
        DNS_Info.DNS_List[id].latency = latency;
    }

    function checkMin(id) {
        var best = DNS_Info.DNS_List[DNS_Info.BestDNS];
        var current = DNS_Info.DNS_List[id].latency;
        if (!DNS_Info.BestDNS || best > current) {
            DNS_Info.BestDNS = id;
        }
    }

    function isEnable(id) {
        if (isSystemDNS_Server(DNS_Info.DNS_List[id].DNS_servers))
            DNS_Info.EnableDNS = id;
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
        isEnable(id);
        await updateDNS(id);
        checkMin(id);

        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    async function updateAll() {
        for (const id in DNS_Info.DNS_List) {
            isEnable(id);
            await updateDNS(id);
            checkMin(id);
        }

        var networks = await getConnectedNetworkInterfaces();
        DNS_Info.ConnectedInterfaces = networks;

        setDNS_Info(DNS_Info);
        setHasUpdate(!HasUpdate);
    }

    useEffect(() => {
        updateAll();
    }, []);


    return { DNS_Info, setDNS_Info, HasUpdate, setHasUpdate, update, remove, edit };
}

export default useDNS_Info;
