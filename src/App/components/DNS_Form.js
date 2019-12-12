//is-invalid is-valid
import IP_input from './IP_input';

class DNS_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DNS1: props.DNS1 || "",
            DNS2: props.DNS2 || "",
            Name: props.name || ""
        };
    }

    updateName(e) {
        this.setState({
            Name: e.target.value
        })
    }

    done() {
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
                                        DNS={this.state.DNS1}
                                        change={(value) => this.setState({ DNS1: value })} />

                                    <IP_input
                                        title="DNS جایگزین :"
                                        DNS={this.state.DNS2}
                                        change={(value) => this.setState({ DNS2: value })} />
                                </div>

                                <div className="form-group row">
                                    <div className="col-12">
                                        <label htmlFor="DNS-Name" className="float-right">نام ارائه دهنده :</label>
                                        <input id="DNS-Name" value={this.state.Name} onChange={(e) => this.updateName(e)}
                                            type="text" className="form-control" />
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
