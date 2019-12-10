import Nav from './components/Nav';

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ActiveTab: 0 };
        this.setActiveTab = this.setActiveTab.bind(this);
        this.tabs_name = React.Children.map(props.children, child => child.props.name);
    }

    setActiveTab(index) {
        this.setState({ ActiveTab: index });
    }



    render() {
        var tabs = React.Children.map(this.props.children, (child, i) =>
            <div className={"tab-pane fade show active" + (i === this.state.ActiveTab ? '' : "d-none")}
                role="tabpanel" aria-labelledby="pills-con">
                {child}
            </div>
        )
        
        return (
            <div className="row h-100">

                <div className="col content">
                    <div className="tab-content " id="v-pills-tabContent">
                        {tabs}
                    </div>
                </div>

                <div className="col-3 menu bg-light shadow">
                    <Nav tabs_name={this.tabs_name} setTab={this.setActiveTab} />
                </div>

            </div>
        );
    }
}

export default Tabs;
