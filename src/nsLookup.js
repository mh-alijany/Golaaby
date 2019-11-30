const { Resolver } = require('dns');
const resolver = new Resolver();

// set DNS server
function setDNS_Servers(DNS_array) {
    resolver.setServers(DNS_array);
}

// measure time of resolving a domain
export async function measure(DNS_array, dist = 'google.com') {
    setDNS_Servers(DNS_array);
    var time = new Date().getTime();
    resolver.resolve4(dist, (err, addresses) => {
        if (err) console.log('false');
        console.log(new Date().getTime() - time);
    });
}