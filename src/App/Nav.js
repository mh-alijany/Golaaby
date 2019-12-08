const Nav = () => {
    
    return (
        <div className="nav flex-column nav-pills text-right mt-5" id="v-pills-tab" role="tablist"
            aria-orientation="vertical">
            <a className="nav-link active" id="pills-con" data-toggle="pill" href="#tab-con" role="tab"
                aria-controls="tab-con" aria-selected="true">اتصال</a>

            <a className="nav-link" id="pills-set" data-toggle="pill" href="#tab-set" role="tab"
                aria-controls="tab-set" aria-selected="false"> DNS تنظیم</a>

            <a className="nav-link" id="pills-check" data-toggle="pill" href="#tab-check" role="tab"
                aria-controls="tab-check" aria-selected="false">برسی تحریم</a>

            <a className="nav-link" id="pills-settings" data-toggle="pill" href="#tab-settings" role="tab"
                aria-controls="tab-settings" aria-selected="false">تنظیمات</a>
        </div>
    );
}

export default Nav;
