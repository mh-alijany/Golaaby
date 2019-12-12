import { setDNS_Auto, setDNS_ConnectedInterfaces } from '../kernel'
import { realpathSync } from 'fs';
import { async } from 'q';
// import useDNS_Info from '../../useDNS_Info';
import { panels, ConnectedDNSBody } from './panels'


const MainTab = (props) => {
    var [DNS_Info, setDNS_Info, HasUpdate, setHasUpdate] = props.DNS_Info;
    var DNS_List =DNS_Info.DNS_List;
    const [Panel, setPanel] = React.useState(<panels.Load />);

    async function connect() {
        await setDNS_ConnectedInterfaces(DNS_List[DNS_Info.BestDNS].DNS_servers);
        DNS_Info.EnableDNS = DNS_Info.BestDNS;
        setDNS_Info(DNS_Info);
        update();
    }

    async function tryAgain() {
        update();
    }

    async function disconnect() {
        var out = await setDNS_Auto();
        DNS_Info.EnableDNS = false;
        setDNS_Info(DNS_Info);
        update();
    }

    async function update() {
        if (DNS_Info.EnableDNS) {
            var DNS = DNS_List[DNS_Info.EnableDNS];
            var body = <ConnectedDNSBody name={DNS.name} link={DNS.url} />
            setPanel(<panels.Connected btnAction={disconnect} body={body} />);
        } else if (DNS_Info.ConnectedInterfaces.length === 0) {
            setPanel(<panels.NoNet btnAction={tryAgain} />);
        } else {
            setPanel(<panels.Disconnect btnAction={connect} />);
        }
        setDNS_Info(DNS_Info);
    }

    React.useEffect(() => {
        if (HasUpdate) {
            update();
            setHasUpdate(false);
        }
    }, [HasUpdate]);

    return (
        <div className={"tab-pane fade show active" + (props.isActive ? '' : "d-none")}>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex vh-100 justify-content-center align-items-center">
                        {/* pre load images */}
                        <img className="d-none" src="/Asset 51024 px.png" />
                        <img className="d-none" src="/Asset 101024 px.png" />
                        <img className="d-none" src="/Asset 81024 px.png" />
                        <img className="d-none" src="/Asset 91024 px.png" />
                        {Panel}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainTab;


