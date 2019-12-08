import Tabs from './Components/Tabs/Tabs';

import Main from './Components/MainTab/MainTab';
import Manual from './Components/ManualTab/ManualTab';
import Check from './Components/CheckTab/CheckTab';
import Setting from './Components/SettingTab/SettingTab';

const App = () => {
    // use Load as default state
    // const [CurrentTab, setCurrentTab] = useState('main');

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
