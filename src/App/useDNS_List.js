import { useState, useEffect } from 'react';
import { defaultData } from './globals';

var { getLatency, isSystemDNS_Server } = require('./kernel');


const useDNS_List = () => {
    const [DNS_List, setDNS_List] = useState(defaultData.DNS_list);
    const [BestDNS_id, setBestDNS_id] = useState(1);
    const [IsUpdate, setIsUpdate] = useState(false);
    const [EnableDNS_id, setEnableDNS_id] = useState(false);

    useEffect(() => {
        async function update() {
            var min = Infinity;
            var best_id;

            for (const id in DNS_List) {
                if (isSystemDNS_Server(DNS_List[id].DNS_servers))
                    setEnableDNS_id(id);

                var latency = await getLatency(DNS_List[id].DNS_servers);
                DNS_List[id].latency = latency;

                if (latency < min) {
                    min = latency;
                    best_id = id;
                }
            }

            setBestDNS_id(best_id);
            setDNS_List(DNS_List);
            setIsUpdate(true);
        }

        update();
    }, []);

    return [DNS_List, BestDNS_id, EnableDNS_id, IsUpdate];
}

export default useDNS_List;
