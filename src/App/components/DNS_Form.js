//is-invalid is-valid
import IP_input from './IP_input';

class DNS_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DNS1: props.DNS1 || "",
            DNS2: props.DNS2 || "",
            Name: props.name || "",
            alert: ""
        };
    }

    updateName(e) {
        this.setState({
            Name: e.target.value,
            Name_: e.target.value ? "is-valid" : "is-invalid"
        })
    }

    isValid() { // move in form
        let condition_1 = this.state.Name != '';
        let condition_2 = this.state.DNS1 != this.state.DNS2;
        let condition_3 = /^([\d]{1,3}\.?){4}$/.test(this.state.DNS1)
        let condition_4 = /^([\d]{1,3}\.?){4}$/.test(this.state.DNS2)

        condition_1 || this.setState({ Name_: "is-invalid" });
        condition_2 || this.setState({ DNS1_: "is-invalid", DNS2_: "is-invalid" })
        condition_3 || this.setState({ DNS1_: "is-invalid" })
        condition_4 || this.setState({ DNS2_: "is-invalid" })

        // is-invalid control
        return condition_1 && condition_2 && condition_3 && condition_4;
    }

    done() {
        if (this.isValid())
            this.props.action({
                name: this.state.Name,
                DNS_servers: [this.state.DNS1, this.state.DNS2]
            })
    }

    render() {
        return (
            <div className="modal fa fade show m-display" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                        </div>

                        <div className="modal-body">
                            <form className="px-3 py-2">
                                <div className="form-group row">
                                    <IP_input
                                        title="DNS اصلی :"
                                        setDNS_={(valid) => this.setState({ DNS1_: valid })}
                                        DNS={this.state.DNS1}
                                        Oder={this.state.DNS2}
                                        change={(value) => this.setState({ DNS1: value })} />

                                    <IP_input
                                        title="DNS جایگزین :"
                                        DNS={this.state.DNS2}
                                        Oder={this.state.DNS1}
                                        change={(value) => this.setState({ DNS2: value })} />
                                </div>

                                <div className="form-group row">
                                    <div className="col-12">
                                        <label htmlFor="DNS-Name" className="float-right">نام ارائه دهنده :</label>
                                        <input id="DNS-Name" value={this.state.Name} onChange={(e, isValid) => this.updateName(e, isValid)}
                                            type="text" className={"form-control " + this.state.Name_} />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" onClick={this.props.close}
                                className="btn btn-secondary" data-dismiss="modal">لغو</button>
                            <button type="button" onClick={() => this.done()}
                                className="btn btn-primary">قبول</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default DNS_Form;
