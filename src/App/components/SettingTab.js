import { read, write } from '../modules/fs';
const app = require('electron').remote.app


function getSetting() {
    return read("setting", {
        "theme": "light",
        "autoStart": true,
        "autoConnect": false
    })
}

function setSetting(setting) { // TODO: use it in use effect
    write("setting", setting) // TODO: merge white previous setting
}

const SettingTab = (props) => {
    const [setting, setSetting] = React.useState(getSetting());
    const [Save, setSave] = React.useState(false); // save on state change

    function autoStart(e) {
        let AStart = !setting.autoStart;
        app.setLoginItemSettings({
            openAtLogin: AStart,
            openAsHidden: false, // FIXME: make it true 
        })
        setSetting(setting => Object.assign(setting, { autoStart: !setting.autoStart }))
        setSave(Save => !Save);
    }

    function autoConnect(e) {
        let AConnect = !setting.autoConnect;
        setSetting(setting => Object.assign(setting, { autoConnect: !setting.autoConnect }))
        setSave(Save => !Save);
    }

    function theme(e) {
        let tm = e.target.id;
        setSetting(setting => Object.assign(setting, { theme: tm }));
        setSave(Save => !Save);
    }

    return (
        <div className={"tab-pane fade show active" + (props.isActive ? '' : "d-none")}>

            <div className="container mt-3">
                <div className="row text-dark fa">
                    <div className="col-12 mx-3">
                        <form>


                            <div className="form-group row text-right ">
                                <h5 className="float-left text-primary">برنامه</h5>
                                <div className="col-12 mb-2">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="opt-startup"
                                            checked={setting.autoStart}
                                            onChange={autoStart} />
                                        <label className="custom-control-label" htmlFor="opt-startup">شروع خودکار با بالا آمدنِ ویندوز</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="opt-auto"
                                            checked={setting.autoConnect}
                                            disabled={true /* TODO: remove :)*/}
                                            onChange={autoConnect} />
                                        <label className="custom-control-label" htmlFor="opt-auto">اتصال خودکار</label>
                                    </div>
                                </div>
                            </div>



                            <div className="form-group row text-right">
                                <h5 className="float-left text-primary">ظاهر</h5>
                                <div className="col-12 mb-2">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="light" name="customRadio-them" className="custom-control-input"
                                            checked={setting.theme == "light"}
                                            onChange={theme} />
                                        <label className="custom-control-label" htmlFor="light">روشن</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="dark" name="customRadio-them" className="custom-control-input"
                                            checked={setting.theme == "dark"}
                                            onChange={theme} />
                                        <label className="custom-control-label" htmlFor="dark">تیره</label>
                                    </div>
                                </div>
                            </div>



                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SettingTab;
