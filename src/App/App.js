import Tabs from './Components/Tabs/Tabs';

import Main from './Components/MainTab/MainTab';
import Manual from './Components/ManualTab/ManualTab';
import Check from './Components/CheckTab/CheckTab';
import Setting from './Components/SettingTab/SettingTab';

import useDNS_Info from './useDNS_Info';

const App = () => {
    const DNS_info = useDNS_Info();

    return (
        <div className="container-fluid vh-100 overflow-auto flex-grow-1 position-relative">

            <Tabs>
                <Main name="اتصال خودکار" DNS_info={DNS_info} />
                <Manual name="اتصال دستی" />
                <Check name="برسی تحریم" />
                <Setting name="تنظیمات" />
            </Tabs>

        </div>
    );
}

export default App;
