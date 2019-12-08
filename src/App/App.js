import Tabs from './Components/Tabs';

import Main from './Components/Tabs/MainTab';
import Manual from './Components/Tabs/ManualTab';
import Check from './Components/Tabs/CheckTab';
import Setting from './Components/Tabs/SettingTab';

const App = () => {
    // use Load as default state
    // const [CurrentTab, setCurrentTab] = useState('main');

    return (
        <div className="container-fluid vh-100 overflow-auto flex-grow-1 position-relative">

            <Tabs>
                <Main name="اتصال" />
                <Manual name="دستی" />
                <Check name="برسی" />
                <Setting name="تنظیمات" />
            </Tabs>
            
        </div>
    );
}

export default App;
