const Report = (props) => {
    return (
        <div className={"tab-pane fade show active" + (props.isActive ? '' : "d-none")}>

            <div className="container">
                <div className="row">
                    <div className="col-11 mx-auto">
                        <form>
                            <div className="form-row">
                                <label htmlFor="checkDomain" className="d-block text-primary mx-auto mt-5 pt-5 mb-3">
                                    <h5>برسی یا گذارش تحریم</h5>
                                </label>
                                <div className="input-group mb-3">
                                    <input type="url" className="form-control" id="checkDomain" placeholder="آدرس صفحه مورد نظر"
                                        required />
                                    <div className="valid-feedback">
                                        با گلابی کار می کنه
                                </div>
                                    <div className="invalid-feedback">
                                        این فیلتر که.
                                </div>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">برسی</button>
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

export default Report;
