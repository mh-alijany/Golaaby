export class IP_input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Value: props.DNS || ""
        }
        this.update = this.update.bind(this);
    }

    update(event) {
        let ip = event.target.value || "";

        if (this.state.Value.indexOf(ip) === 0) {
            this.setState({ Value: ip })
            return;
        }

        let regex = /(\d{1,3})\.?/g;
        ip = ip.match(regex) || [];
        let _ip = "";

        ip.forEach((part, index) => {
            if (index > 3) return;

            let dot = '';
            if (index != 3 && (part > 100 || part.endsWith(".")))
                dot = ".";

            _ip += Math.min(255, part) + dot;
        });

        this.setState({ Value: _ip });
        this.props.updateDNS({ [this.props.id]: _ip });
    }

    render() {
        return (
            <div className="col-6">
                <label htmlFor={this.props.id} className="float-right">DNS جایگذین :</label>
                <input id={this.props.id} value={this.state.Value || ''} onChange={this.update}
                    style={{ direction: "ltr" }} placeholder="DNS IP" type="text" className="form-control" />
            </div>
        );
    }
}



export default IP_input;
