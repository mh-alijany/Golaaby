export const panels = {
    Disconnect: function (props) {
        return (
            <div className="status-non card my-3 border-0">
                <img className="card-img-top img-fluid w-25 mx-auto mb-5" src="/Asset 81024 px.png" />
                <div className="card-body text-center">
                    <h5 className='card-title text-danger'>گلابی وصل نیست</h5>
                    <p className="card-text mb-5">با کلیک بر اتصال به سریع ترین سرویس متصل شوید</p>
                    <button type="button" onClick={props.btnAction} className="btn mx-auto d-block text-light btn-primary">اتصال</button>
                </div>
            </div>
        )
    },

    Connected: function (props) {
        return (
            <div className="status-non card my-3 border-0">
                <img className="card-img-top img-fluid w-25 mx-auto mb-5" src="/Asset 51024 px.png" />
                <div className="card-body text-center">
                    <h5 className='card-title text-primary'>گلابی متصل است</h5>
                    <p className="card-text mb-5">{props.body}</p>
                    <button type="button" onClick={props.btnAction} className="btn mx-auto d-block text-light btn-danger">قطع اتصال</button>
                </div>
            </div>
        )
    },

    NoNet: function (props) {
        return (
            <div className="status-non card my-3 border-0">
                <img className="card-img-top img-fluid w-25 mx-auto mb-5" src="/Asset 91024 px.png" />
                <div className="card-body text-center">
                    <h5 className='card-title text-danger'>گلابی متصل است</h5>
                    <p className="card-text mb-5">اتصال خود با شبکه را برسی کنید</p>
                    <button type="button" onClick={props.btnAction} className="btn mx-auto d-block text-light btn-primary">تلاش مجدد</button>
                </div>
            </div>
        )
    },

    Load: function () {
        return (
            <div className="status-non card my-3 border-0">
                <img className="card-img-top img-fluid w-25 mx-auto mb-5" src="/Asset 101024 px.png" />
                <div className="card-body text-center">
                    <h5 className='card-title text-danger'>صبر کنید</h5>
                    <p className="card-text mb-5"> ... در حال بار گذاری </p>
                    <button type="button" disabled={true} className="btn mx-auto d-block text-light btn-primary">تلاش مجدد</button>
                </div>
            </div>
        )
    },
}

export const ConnectedDNSBody = (props) => {
    return (
        <span>شما در حال استفاده از <a href={props.link} target="_blank"><b>{props.name}</b></a> هستید</span>
    );
}