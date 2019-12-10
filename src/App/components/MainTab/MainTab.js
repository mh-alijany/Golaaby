import { getConnectedNetworkInterfaces, setDNS_Auto, setDNS_ConnectedInterfaces } from '../../kernel'
import { realpathSync } from 'fs';
import { async } from 'q';
import useDNS_Info from '../../useDNS_Info';

var panels = {
    disconnect: function (props) {
        return (
            <div className="status-non card my-3 border-0">
                <img className="card-img-top img-fluid w-25 mx-auto mb-5" src="/Asset 81024 px.png" />
                <div className="card-body text-center">
                    <h5 className='card-title text-danger'>گلابی وصل نیست</h5>
                    <p className="card-text mb-5">با کلیک بر اتصال به سریع ترین سرویس متصل شوید</p>
                    <button type="button" onClick={props.btnAction} className="btn mx-auto d-block text-light btn-primary">اتصال</button>
                </div>
            </div>
        )
    },

    connected: function (props) {
        return (
            <div className="status-non card my-3 border-0">
                <img className="card-img-top img-fluid w-25 mx-auto mb-5" src="/Asset 51024 px.png" />
                <div className="card-body text-center">
                    <h5 className='card-title text-primary'>گلابی متصل است</h5>
                    <p className="card-text mb-5">{props.body}</p>
                    <button type="button" onClick={props.btnAction} className="btn mx-auto d-block text-light btn-danger">قطع اتصال</button>
                </div>
            </div>
        )
    },

    noNet: function (props) {
        return (
            <div className="status-non card my-3 border-0">
                <img className="card-img-top img-fluid w-25 mx-auto mb-5" src="/Asset 91024 px.png" />
                <div className="card-body text-center">
                    <h5 className='card-title text-danger'>گلابی متصل است</h5>
                    <p className="card-text mb-5">اتصال خود با شبکه را برسی کنید</p>
                    <button type="button" onClick={props.btnAction} className="btn mx-auto d-block text-light btn-primary">تلاش مجدد</button>
                </div>
            </div>
        )
    },

    Load: function () {
        return (
            <div className="status-non card my-3 border-0">
                <img className="card-img-top img-fluid w-25 mx-auto mb-5" src="/Asset 101024 px.png" />
                <div className="card-body text-center">
                    <h5 className='card-title text-danger'>صبر کنید</h5>
                    <p className="card-text mb-5"> ... در حال بار گذاری </p>
                    <button type="button" disabled={true} className="btn mx-auto d-block text-light btn-primary">تلاش مجدد</button>
                </div>
            </div>
        )
    },
}

const ConnectedDNSBody = (props) => {
    return (
        <span>شما در حال استفاده از <a href={props.link} target="_blank"><b>{props.name}</b></a> هستید</span>
    );
}

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

        var networks = await getConnectedNetworkInterfaces();
        if (DNS_Info.EnableDNS) {
            var DNS = DNS_Info.DNS_List[DNS_Info.EnableDNS];
            var body = <ConnectedDNSBody name={DNS.name} link={DNS.url} />
            setPanel(<panels.connected btnAction={disconnect} body={body} />);
        } else if (networks.length === 0) {
            setPanel(<panels.noNet btnAction={tryAgain} />);
        } else {
            setPanel(<panels.disconnect btnAction={connect} />);
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
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex vh-100 justify-content-center align-items-center">
                    {/* pre load images */}
                    <img className="d-none" src="/Asset 51024 px.png" />
                    <img className="d-none" src="/Asset 101024 px.png" />
                    <img className="d-none" src="/Asset 81024 px.png" />
                    <img className="d-none" src="/Asset 91024 px.png" />


                    {Panel}


                    {/* <div className="mt-3 border border-primary rounded">
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
                    </div> */}

                </div>
            </div>
        </div>
    );
}

export default MainTab;
