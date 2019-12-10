import Nav from './components/Tabs/Nav';

import Main from './Components/MainTab/MainTab';
import Manual from './Components/ManualTab/ManualTab';
import Check from './Components/CheckTab/CheckTab';
import Setting from './Components/SettingTab/SettingTab';

const App = () => {
    const tabs = ["اتصال خودکار", "اتصال دستی", "برسی تحریم", "تنظیمات"];
    const [ActiveTab, setActiveTab] = React.useState("اتصال خودکار");

    return (
        <div className="container-fluid vh-100 overflow-auto flex-grow-1 position-relative">
            <div className="row h-100">

                <div className="col content">
                    <div className="tab-content " id="v-pills-tabContent">
                        <Main isActive={ActiveTab == "اتصال خودکار"} />
                        <Manual isActive={ActiveTab == "اتصال دستی"} />
                        <Check isActive={ActiveTab == "برسی تحریم"} />
                        <Setting isActive={ActiveTab == "تنظیمات"} />
                    </div>
                </div>

                <div className="col-3 menu bg-light shadow">
                    <Nav tabs_name={tabs} setTab={setActiveTab} />
                </div>

            </div>

        </div>
    );
}

export default App;
