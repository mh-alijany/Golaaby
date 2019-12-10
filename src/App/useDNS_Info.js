import { useState, useEffect } from 'react';
import { defaultData } from './globals';

var { getLatency, isSystemDNS_Server } = require('./kernel');


const useDNS_Info = () => {
    const [DNS_Info, setDNS_Info] = useState({
        DNS_List: defaultData.DNS_list,
        BestDNS: false,
        EnableDNS: false,
    });

    const [HasUpdate, setHasUpdate] = useState(false);

    useEffect(() => {
        async function update() {
            var min = Infinity;

            for (const id in DNS_Info.DNS_List) {
                if (isSystemDNS_Server(DNS_Info.DNS_List[id].DNS_servers))
                    DNS_Info.EnableDNS = id;

                var latency = await getLatency(DNS_Info.DNS_List[id].DNS_servers);
                DNS_Info.DNS_List[id].latency = latency;

                if (latency < min) {
                    min = latency;
                    DNS_Info.BestDNS = id;
                }
            }

            setDNS_Info(DNS_Info);
            setHasUpdate(true);
        }

        update();
    }, []);


    return [DNS_Info, setDNS_Info, HasUpdate, setHasUpdate];
}

export default useDNS_Info;
