import Tabs from './Components/Tabs/Tabs';

import Main from './Components/MainTab/MainTab';
import Manual from './Components/ManualTab/ManualTab';
import Check from './Components/CheckTab/CheckTab';
import Setting from './Components/SettingTab/SettingTab';

import useDNS_List from './useDNS_List';

// import { useState, useEffect } from 'react';

const App = () => {
    const [DNS_List, BestDNS_id] = useDNS_List();

    return (
        <div className="container-fluid vh-100 overflow-auto flex-grow-1 position-relative">

            <Tabs>
                <Main name="اتصال خودکار" />
                <Manual name="اتصال دستی" />
                <Check name="برسی تحریم" />
                <Setting name="تنظیمات" />
            </Tabs>

        </div>
    );
}

export default App;
