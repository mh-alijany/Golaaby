import { getConnectedNetworkInterfaces, setDNS_Auto, setDNS_ConnectedInterfaces } from '../../kernel'
import { realpathSync } from 'fs';
import { async } from 'q';

var panels = {
    disconnect: {
        img: '/Asset 81024 px.png',
        color: 'text-danger',
        title: 'گلابی وصل نیست',
        body: 'با کلیک بر اتصال به سریع ترین سرویس متصل شوید',
        btnText: 'اتصال',
        btnColor: 'btn-primary',
        btnAction: () => { },
        btnDisable: false
    },

    connected: {
        img: '/Asset 51024 px.png',
        color: 'text-primary',
        title: 'گلابی متصل است',
        body: '',
        btnText: 'قطع اتصال',
        btnColor: 'btn-danger',
        btnAction: setDNS_Auto,
        btnDisable: false
    },

    noNet: {
        img: '/Asset 91024 px.png',
        color: 'text-danger',
        title: 'ارتباط ناموفق',
        body: 'اتصال خود با شبکه را برسی کنید',
        btnText: 'اتصال',
        btnColor: 'btn-primary',
        btnAction: () => { },
        btnDisable: true
    },

    load: {
        img: '/Asset 101024 px.png',
        color: 'text-danger',
        title: 'صبر کنید',
        body: ' ... در حال بار گذاری',
        btnText: 'اتصال',
        btnColor: 'btn-primary',
        btnAction: () => { },
        btnDisable: true
    }
}

const ConnectedDNSBody = (props) => {
    return (
        <span>شما در حال استفاده از <a href={props.link} target="_blank"><b>{props.name}</b></a> هستید</span>
    );
}

const MainTab = (props) => {
    const [Panel, setPanel] = React.useState(panels.load);

    React.useEffect(() => {
        async function update() {
            var networks = await getConnectedNetworkInterfaces();

            if (networks.length === 0) {
                setPanel(panels.noNet);
            } else if (props.DNS_info.EnableDNS) {
                var DNS = props.DNS_info.DNS_List[props.DNS_info.EnableDNS];
                panels.connected.body = <ConnectedDNSBody name={DNS.name} link={DNS.url} />
                setPanel(panels.connected);
            } else {
                panels.disconnect.btnAction = () => { debugger; setDNS_ConnectedInterfaces(props.DNS_info.DNS_List[props.DNS_info.BestDNS]).DNS_servers }
                setPanel(panels.disconnect);
            }
        }

        update();
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex vh-100 justify-content-center align-items-center">

                    <div className="status-non card my-3 border-0">
                        <img className="card-img-top img-fluid w-25 mx-auto mb-5" src={Panel.img} alt="Card image cap" />
                        <div className="card-body text-center">
                            <h5 className={'card-title ' + Panel.color}>{Panel.title}</h5>
                            <p className="card-text mb-5">{Panel.body}</p>
                            <button type="button" disabled={Panel.btnDisable} onClick={Panel.btnAction}
                                className={"btn mx-auto d-block text-light " + Panel.btnColor}>
                                {Panel.btnText}</button>
                        </div>
                    </div>

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
