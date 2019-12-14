import { async } from 'q';
import { panels, ConnectedDNSBody } from './panels'

const MainTab = (props) => {
    var { DNS_Info, HasUpdate, connect, disconnect, update } = props.DNS_Info;
    var DNS_List = DNS_Info.DNS_List;

    const [Panel, setPanel] = React.useState(<panels.Load />);
    const [didMount, setDidMount] = React.useState(false);

    async function tryAgain() {
        // need fix shell cancel;
        // update();
    }

    async function updatePanel() {
        if (DNS_Info.EnableDNS) {
            var DNS = DNS_List[DNS_Info.EnableDNS];
            var body = <ConnectedDNSBody name={DNS.name} link={DNS.url} />
            setPanel(<panels.Connected btnAction={disconnect} body={body} />);
        } else if (DNS_Info.ConnectedInterfaces.length === 0) {
            setPanel(<panels.NoNet btnAction={tryAgain} />);
        } else {
            setPanel(<panels.Disconnect btnAction={connect} />);
        }
        // setDNS_Info(DNS_Info);
    }

    React.useEffect(() => {
        if (didMount)
            updatePanel();
        else setDidMount(true);
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


