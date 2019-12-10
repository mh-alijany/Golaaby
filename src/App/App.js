import Nav from './components/Tabs/Nav';
import Main from './Components/MainTab/MainTab';
import Manual from './Components/ManualTab/ManualTab';
import Check from './Components/CheckTab/CheckTab';
import Setting from './Components/SettingTab/SettingTab';

import useDNS_Info from './useDNS_Info'

const App = () => {
    const DNS_Info = useDNS_Info();
    const tabs = ["اتصال خودکار", "اتصال دستی", "برسی تحریم", "تنظیمات"];
    const [ActiveTab, setActiveTab] = React.useState("اتصال خودکار");

    return (
        <div className="container-fluid vh-100 overflow-auto flex-grow-1 position-relative">
            <div className="row h-100">

                <div className="col content">
                    <div className="tab-content " id="v-pills-tabContent">
                        <Main isActive={ActiveTab == "اتصال خودکار"} DNS_Info={DNS_Info} />
                        <Manual isActive={ActiveTab == "اتصال دستی"} DNS_Info={DNS_Info} />
                        <Check isActive={ActiveTab == "برسی تحریم"} />
                        <Setting isActive={ActiveTab == "تنظیمات"} />
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
