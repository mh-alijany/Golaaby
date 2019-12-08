const Tabs = () => {
    return (
        <div className="tab-content " id="v-pills-tabContent">

            <div className="tab-pane fade show active" id="tab-con" role="tabpanel" aria-labelledby="pills-con">
            </div>

            <div className="tab-pane fade text-dark" id="tab-set" role="tabpanel" aria-labelledby="pills-set">
            </div>

            <div className="tab-pane fade" id="tab-check" role="tabpanel" aria-labelledby="pills-check">
            </div>

            <div className="tab-pane fade" id="tab-settings" role="tabpanel" aria-labelledby="pills-settings">
            </div>

        </div>
    );
}

export default Tabs;
