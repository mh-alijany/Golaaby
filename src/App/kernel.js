/**
 * get dns which has minimum latency
 * @exports
 * @param {Object} DNS_list
 * @returns {Number} id of best DNS
 */
export function getBestDNS(DNS_list) {
    var min = Infinity;
    var best_id;
    for (const id in DNS_list) {
        var latency = DNS_list[id].latency;
        if (latency < min) {
            min = latency;
            best_id = id;
        }
    }
    return best_id;
}
