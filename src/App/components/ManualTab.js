import DNS_Form from './DNS_Form';
import DNS_Row from './DNS_Row';

export class ManualTab extends React.Component {
    constructor(props) {
        super(props);

        this.DNS_Info = props.DNS_Info.DNS_Info;
        this.setDNS_Info = props.DNS_Info.setDNS_Info;

        this.state = {
            form: false,
            rows: this.getRows()
        }

        this.addDNS = this.addDNS.bind(this);
        this.openAddDNS = this.openAddDNS.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    getRows() {
        let DNS_List = Object.values(this.DNS_Info.DNS_List);
        return DNS_List.map((DNS) => {
            let key = DNS.id + (DNS.latency || "")
            return <DNS_Row DNS={DNS} key={key} />
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.DNS_Info.HasUpdate != prevProps.DNS_Info.HasUpdate) {
            this.DNS_Info = this.props.DNS_Info.DNS_Info;
            var newRow = this.getRows();
            this.setState({
                rows: newRow
            });
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {      
    // }

    openAddDNS() {
        this.setState({
            form: <DNS_Form title="افزودن" action={this.addDNS} close={this.closeForm} />
        });
    }

    openEditDNS(id) {
        this.setState({
            form: <DNS_Form title="ویرایش" action={this.addDNS} close={this.closeForm} />
        });
    }

    closeForm() {
        this.setState({ form: null })
    }


    isValid(form, adding) { // move in form
        let DNS_List = Object.values(this.DNS_Info);
        let condition_1 = form.name != '';
        let condition_2 = form.DNS1 != form.DNS2;
        let condition_3 = adding && DNS_List.every(item => item.name != form.name);

        return condition_1 && condition_2 && condition_3 // else add warns to form
    }

    addDNS(form) {
        var rows = this.state.rows;
        if (form && this.isValid(form, true)) {
            form.id = form.name; // check it later
            this.DNS_Info.DNS_List[form.name] = form;
            this.setDNS_Info(this.DNS_Info);
            this.props.DNS_Info.setHasUpdate(!this.props.DNS_Info.HasUpdate);

            this.setState({ form: false, rows: rows });
        }
    }

    updateLatency(id) {

    }

    removeRow(id) {
        
    }

    render() {
        return (
            <div className={"tab-pane fade show active " + (this.props.isActive ? '' : "d-none")}>

                <div className="m-3 mt-5">
                    <div className="d-flex mb-3 justify-content-between align-items-center">
                        <button type="button" className="btn btn-primary mx-3 my-2 " onClick={this.openAddDNS}>افزودن</button>
                        <h6 className="mx-3 my-2 text-primary">ها DNS لیست</h6>
                    </div>

                    <table className="table mb-0 table-hover text-right text-dark">
                        <thead>
                            <tr className="te">
                                <td scope="col">گزینه ها</td>
                                <td scope="col">تاخیر</td>
                                <td scope="col">سرویس دهنده</td>
                            </tr>
                        </thead>
                        <tbody id='DNS-table'>
                            {this.state.rows}
                        </tbody>
                    </table>
                </div>

                {this.state.form}
            </div>
        );
    }
}

export default ManualTab;




