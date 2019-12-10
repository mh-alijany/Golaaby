import React from 'react';

class DNS_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DNS1: props.DNS1 || "",
            DNS2: props.DNS2 || "",
            Display: props.display
        };
    }


    handleChange(event, index) {
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
                                    <div className="col-12 mb-2">
                                        <input value={this.state.DNS1} onChange={(e) => this.handleChange(e, 1)}
                                            style={{ direction: "ltr" }} placeholder="DNS1" type="text" className="form-control" />
                                    </div>

                                    <div className="col-12 mb-2">
                                        <input value={this.state.DNS2} onChange={(e) => this.handleChange(e, 2)}
                                            style={{ direction: "ltr" }} placeholder="DNS2" type="text" className="form-control" />
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
