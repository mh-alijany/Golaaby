import { setDNS_Auto, setDNS_ConnectedInterfaces } from '../../kernel'
import { realpathSync } from 'fs';
import { async } from 'q';
import useDNS_Info from '../../useDNS_Info';
import { panels, ConnectedDNSBody } from './components/panels'


const MainTab = (props) => {
    const [DNS_Info, setDNS_Info, HasUpdate, setHasUpdate] = useDNS_Info();
    const [Panel, setPanel] = React.useState(<panels.Load />);

    async function connect() {
        var out = await setDNS_ConnectedInterfaces(DNS_Info.DNS_List[DNS_Info.BestDNS].DNS_servers);
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
            var DNS = DNS_Info.DNS_List[DNS_Info.EnableDNS];
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
        console.log("check");
        if (HasUpdate) {
            console.log("getUpdate");
            update();
            setHasUpdate(false);
        }
    }, [HasUpdate]);

    return (
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
    );
}

export default MainTab;


/* <div className="mt-3 border border-primary rounded">
        <div className="bg-primary d-flex justify-content-between align-items-center">
            <button type="button" className="btn btn-light mx-3 my-2 text-primary">افزودن</button>
            <h5 className="mx-3 my-2 text-light">ها DNS لیست</h5>
        </div>
        <table className="table mb-0 table-hover text-right text-primary">
            <thead>
                <tr className="bg-primary text-light">
                    <th scope="col">گذینه ها</th>
                    <th scope="col">تاخیر</th>
                    <th scope="col">سرویس دهنده</th>
                </tr>
            </thead>
            <tbody id='DNS-table'>

            </tbody>
        </table>
    </div> */