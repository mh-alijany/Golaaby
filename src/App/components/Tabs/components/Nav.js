class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.links = props.tabs_name.map((name, index) =>
            <a id="pills-con" data-toggle="pill" aria-controls="tab-con" aria-selected="true"
                className={index === 0 ? 'nav-link active' : 'nav-link'}
                key={index}
                onClick={() => props.setTab(name)}
                role="tab">
                {name}
            </a>
        )
    }

    render() {
        return (
            <div className="nav flex-column nav-pills text-right mt-5" id="v-pills-tab" role="tablist"
                aria-orientation="vertical">
                {this.links}
            </div>
        );
    }
}


export default Nav;
