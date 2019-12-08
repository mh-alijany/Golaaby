import Nav from './Nav';

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ActiveTab: 0 };
        this.setActiveTab = this.setActiveTab.bind(this);

        this.tabs = React.Children.map(props.children, child =>
            <div className="tab-pane fade show active" role="tabpanel" aria-labelledby="pills-con">
                {child}
            </div>
        );
        
        this.tabs_name = React.Children.map(props.children, child => child.props.name);
    }

    setActiveTab(index) {
        this.setState({ ActiveTab: index });
    }

    render() {
        return (
            <div className="row h-100">

                <div className="col content">
                    <div className="tab-content " id="v-pills-tabContent">
                        {this.tabs[this.state.ActiveTab]}
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
