const SettingTab = (props) => {
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
                                        <input type="checkbox" className="custom-control-input" id="opt-startup" />
                                        <label className="custom-control-label" htmlFor="opt-startup">شروع خودکار با بالا آمدنِ ویندوز</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="opt-auto" />
                                        <label className="custom-control-label" htmlFor="opt-auto">برسی خودکار وضعیت</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row text-right">
                                <h5 className="float-left text-primary">ظاهر</h5>
                                <div className="col-12 mb-2">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="light" name="customRadio-them" className="custom-control-input" />
                                        <label className="custom-control-label" htmlFor="light">روشن</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="dark" name="customRadio-them" className="custom-control-input" />
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
