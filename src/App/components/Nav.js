class Nav extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.defaultTab != nextProps.defaultTab;
    }

    render() {
        this.links = this.props.tabs_name.map((name, index) =>
            <a id="pills-con" data-toggle="pill" aria-controls="tab-con" aria-selected="true"
                className={name == this.props.defaultTab ? 'nav-link active' : 'nav-link'}
                key={index}
                onClick={() => this.props.setTab(name)}
                role="tab">
                {name}
            </a>
        );

        return (
            <div className="nav flex-column nav-pills text-right mt-5" id="v-pills-tab" role="tablist"
                aria-orientation="vertical">
                {this.links}
            </div>
        );
    }
}


export default Nav;
