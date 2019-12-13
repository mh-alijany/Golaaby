export class IP_input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Value: props.DNS || "",
            valid: props.valid || ""
        }
        this.update = this.update.bind(this);
    }

    update(event) {
        let input = event.target.value || "";
        let regex = /(\d{1,3})\.?/g;
        let ip = input.match(regex) || [];
        let valid = ip.length > 3 ? "is-valid" : "is-invalid";
        let _ip = "";

        if (this.state.Value.indexOf(input) === 0) {
            this.setState({ Value: input, valid: valid })
            return;
        }


        ip.forEach((part, index) => {
            if (index > 3) return;

            let dot = '';
            if (index != 3 && (part > 100 || part.endsWith(".")))
                dot = ".";

            _ip += Math.min(255, part) + dot;
        });

        this.setState({ Value: _ip, valid: valid })
        this.props.change(_ip);
    }

    render() {
        return (
            <div className="col-6">
                <label htmlFor={this.props.state} className="float-right">{this.props.title}</label>
                <input state={this.props.state} value={this.state.Value || ''} onChange={this.update}
                    style={{ direction: "ltr" }} placeholder="DNS IP" type="text" className={"form-control " + this.state.valid} />
            </div>
        );
    }
}



export default IP_input;
