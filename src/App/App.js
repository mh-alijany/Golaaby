import Nav from './components/Nav';
import Main from './Components/MainTab';
import Manual from './Components/ManualTab';
import Setting from './Components/SettingTab';

import useDNS_Info from './useDNS_Info'

const App = () => {
    const DNS_Info = useDNS_Info();
    const tabs = ["اتصال خودکار", "اتصال دستی", "تنظیمات"];
    const [ActiveTab, setActiveTab] = React.useState(tabs[0]);

    return (
        <div className="container-fluid vh-100 overflow-auto flex-grow-1 position-relative">
            <div className="row h-100">

                <div className="col content">
                    <div className="tab-content " id="v-pills-tabContent">
                        <Main isActive={ActiveTab == tabs[0]} DNS_Info={DNS_Info} />
                        <Manual isActive={ActiveTab == tabs[1]} DNS_Info={DNS_Info} />
                        <Setting isActive={ActiveTab == tabs[2]} />
                    </div>
                </div>

                <div className="col-3 menu bg-light shadow">
                    <Nav tabs_name={tabs} setTab={setActiveTab} defaultTab={ActiveTab} />
                </div>

            </div>

        </div>
    );
}

export default App;
