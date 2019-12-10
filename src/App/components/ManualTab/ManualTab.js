const ManualTab = (props) => {
    var [DNS_Info, setDNS_Info, HasUpdate, setHasUpdate] = props.DNS_Info;

    var rows = Object.values(DNS_Info.DNS_List).map((DNS) =>
        <tr key={DNS.id}>
            <td>...</td>
            <td>
                <span className={"badge text-light " + (DNS.latency ? "badge-success" : "badge-danger")}>
                    {DNS.latency || "درحال برسی"}
                </span>
            </td>
            <td><a href={DNS.url} target="_blank">{DNS.name}</a></td>
        </tr>
    );

    return (
        <div className={"tab-pane fade show active" + (props.isActive ? '' : "d-none")}>

            <div className="m-3 mt-5 rounded">

                <div className="d-flex mb-3 justify-content-between align-items-center">
                    <button type="button" className="btn btn-primary mx-3 my-2 ">افزودن</button>
                    <h6 className="mx-3 my-2 text-primary">ها DNS لیست</h6>
                </div>

                <table className="table mb-0 table-hover text-right text-dark">
                    <thead>
                        <tr className="te">
                            <td scope="col">گذینه ها</td>
                            <td scope="col">تاخیر</td>
                            <td scope="col">سرویس دهنده</td>
                        </tr>
                    </thead>

                    <tbody id='DNS-table'>
                        {rows}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ManualTab;

/*  <form className="fa">
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
        </div>

        <div className="form-group row">
            <div className="custom-control custom-radio">
                <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="customRadio2">به طور خودکار تایین شود</label>
            </div>
        </div>

        <button className="btn btn-primary float-left" type="submit">انجام</button>
    </form>
    */


