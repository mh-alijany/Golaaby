import { useState, useEffect } from 'react';
import { defaultData } from './globals';
var DNS_resolver = require('./modules/nsLookup');

const useDNS_List = () => {
    const [DNS_List, setDNS_List] = useState(defaultData.DNS_list);
    const [BestDNS_ofList, setBestDNS_ofList] = useState(1);

    useEffect(() => {
        async function updateLatency() {

            for (const id in DNS_List) {
                var latency = await DNS_resolver.measure(DNS_List[id].DNS_servers);
                DNS_List[id].latency = latency;
            }

            var min = Infinity;
            var best_id;
            for (const id in DNS_List) {
                var latency = DNS_List[id].latency;
                if (latency < min) {
                    min = latency;
                    best_id = id;
                }
            }

            setBestDNS_ofList(best_id);
            setDNS_List(DNS_List);
        }

        updateLatency();
    }, []);

    return [DNS_List, BestDNS_ofList];
}

export default useDNS_List;
