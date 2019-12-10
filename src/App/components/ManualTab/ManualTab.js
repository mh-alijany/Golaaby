const ManualTab = (props) => {
    return (
        <div className={"tab-pane fade show active" + (props.isActive ? '' : "d-none")}>

            <div className="container mt-5 pt-5">
                <div className="row  justify-content-center">
                    <div className="col-8 m-auto">
                        <form className="fa">
                            <div className="form-group row">
                                <div className="custom-control custom-radio custom-control-inline mb-2 mr-0">
                                    <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="customRadio1">از DNS های زیر استفاده شود</label>
                                </div>
                                <div className="col-12 mb-2">
                                    <input type="text" className="form-control" id="dn1" placeholder="DNS 1" />
                                </div>
                                <div className="col-12 mb-2">
                                    <input type="text" className="form-control" id="dn2" placeholder="DNS 2" />
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary float-left" type="submit">انجام</button>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="customRadio2">به طور خودکار تایین شود</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManualTab;


