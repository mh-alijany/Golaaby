import React from 'react';

//is-invalid is-valid
class DNS_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DNS1: props.DNS1 || "",
            DNS2: props.DNS2 || "",
            Name: props.Name || "",
            Display: props.display
        };
    }

    updateName(e) {
        this.setState({
            Name: e.target.value
        })
    }

    updateIP(event, index) {
        if (index == 1)
            this.setState({ DNS1: event.target.value });
        else
            this.setState({ DNS2: event.target.value });

    }

    exit(done) {
        if (done)
            console.log(this.state.DNS1 + " " + this.state.DNS2);

        this.setState({ Display: false })
    }

    render() {
        return (
            <div className={"modal fa fade show " + (this.state.Display ? "m-display" : "")} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                        </div>
                        <div className="modal-body">

                            <form className="px-3 py-2">
                                <div className="form-group row">
                                    <div className="col-6">
                                        <label htmlFor="DNS1" className="float-right">DNS ترجیحی :</label>
                                        <input id="DNS1" value={this.state.DNS1} onChange={(e) => this.updateIP(e, 1)}
                                            style={{ direction: "ltr" }} placeholder="DNS 1" type="text" className="form-control" />
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="DNS2" className="float-right">DNS جایگذین :</label>
                                        <input id="DNS1" value={this.state.DNS2} onChange={(e) => this.updateIP(e, 2)}
                                            style={{ direction: "ltr" }} placeholder="DNS 2" type="text" className="form-control" />
                                    </div>
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
                            <button type="button" onClick={() => this.exit(false)}
                                className="btn btn-secondary" data-dismiss="modal">لغو</button>
                            <button type="button" onClick={() => this.exit(true)}
                                className="btn btn-primary">قبول</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default DNS_Form;
