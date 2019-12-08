const MainTab = () => {
    return (

        <div className="container">
            <div className="row">
                <div className="col-12">

                    <div className="status-non card text-danger border border-danger my-3">
                        <div className="card-body text-right">
                            <h5 className="card-title">گلابی وصل نیست</h5>
                            <p className="card-text pb-3">برای اتصال می توانید یکی از سرویس دهنده های زیر را انتخاب کنید</p>
                            <button type="button" className="btn btn-danger m-auto d-block text-light">اتصال خودکار</button>
                        </div>
                    </div>

                    <div className="status-set card text-right border border-primary my-3">
                        <div className="card-body text-primary">
                            <h5 className="card-title">گلابی وصل است</h5>
                            <p className="card-text pb-3">شما در حال استفاده از <b id="link">شکن</b> هستید</p>
                            <button type="button" className="btn btn-primary m-auto d-block" id="disconnect">قطع اتصال</button>
                        </div>
                    </div>

                    <div className="mt-3 border border-primary rounded">
                        <div className="bg-primary d-flex justify-content-between align-items-center">
                            <button type="button" className="btn btn-light mx-3 my-2 text-primary">افزودن</button>
                            <h5 className="mx-3 my-2 text-light">ها DNS لیست</h5>
                        </div>
                        <table className="table mb-0 table-hover text-right text-primary">
                            <thead>
                                <tr className="bg-primary text-light">
                                    <th scope="col">گذینه ها</th>
                                    <th scope="col">تاخیر</th>
                                    <th scope="col">سرویس دهنده</th>
                                </tr>
                            </thead>
                            <tbody id='DNS-table'>

                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default MainTab;
