import Main from './Tabs/MainTab';
import Manual from './Tabs/ManualTab';
import Check from './Tabs/CheckTab';
import Setting from './Tabs/SettingTab';

const Tabs = () => {
    return (
        <div className="tab-content " id="v-pills-tabContent">

            <div className="tab-pane fade show active" id="tab-con" role="tabpanel" aria-labelledby="pills-con">
                <Main />
            </div>

            <div className="tab-pane fade text-dark" id="tab-set" role="tabpanel" aria-labelledby="pills-set">
                <Manual />
            </div>

            <div className="tab-pane fade" id="tab-check" role="tabpanel" aria-labelledby="pills-check">
                <Check />
            </div>

            <div className="tab-pane fade" id="tab-settings" role="tabpanel" aria-labelledby="pills-settings">
                <Setting />
            </div>

        </div>
    );
}

export default Tabs;
