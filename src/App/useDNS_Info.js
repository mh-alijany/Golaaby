import { useState, useEffect } from 'react';
import { defaultData } from './globals';

var { getLatency, isSystemDNS_Server } = require('./kernel');


const useDNS_Info = () => {
    const [DNS_Info, setDNS_Info] = useState({
        DNS_List: defaultData.DNS_list,
        BestDNS: false,
        EnableDNS: false,
        IsUpdate: false,
    });

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

            DNS_Info.IsUpdate = true;
            setDNS_Info(DNS_Info);
        }

        update();
    }, []);

    return DNS_Info;
}

export default useDNS_Info;
