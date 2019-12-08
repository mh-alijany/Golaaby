import { useState, useEffect } from 'react';
import { defaultData } from './globals';
var DNS_resolver = require('./modules/nsLookup');

const useDNS_List = () => {
    const [DNS_List, setDNS_List] = useState(defaultData.DNS_list);

    useEffect(() => {
        async function updateLatency() {
            for (const id in DNS_List) {
                var latency = await DNS_resolver.measure(DNS_List[id].DNS_servers);
                DNS_List[id].latency = latency;
            }
        }

        updateLatency();
        setDNS_List(DNS_List);
    }, []);

    return DNS_List;
}

export default useDNS_List;
