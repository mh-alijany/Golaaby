import DNS_Form from './DNS_Form';
import DNS_Row from './DNS_Row';

export class ManualTab extends React.Component {
    constructor(props) {
        super(props);
        // [DNS_Info, setDNS_Info, HasUpdate, setHasUpdate]
        this.DNS_Info = props.DNS_Info[0];

        this.state = {
            form: false,
            form_title: "افزودن DNS",
            rows: Object.values(this.DNS_Info.DNS_List).map((DNS) => <DNS_Row DNS={DNS} key={DNS.id} />)
        }

        this.addDNS = this.addDNS.bind(this);
        this.openAddDNS = this.openAddDNS.bind(this);
    }

    addDNS(DNS) {
        var rows = this.state.rows;
        if (DNS) rows.push(<DNS_Row DNS={DNS} key={DNS.id} />);

        this.setState({
            form: false,
            rows: rows
        });
    }

    openAddDNS() {
        this.setState({
            form: true,
            form_title: "افزودن DNS"
        });
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
                                <td scope="col">گذینه ها</td>
                                <td scope="col">تاخیر</td>
                                <td scope="col">سرویس دهنده</td>
                            </tr>
                        </thead>
                        <tbody id='DNS-table'>
                            {this.state.rows}
                        </tbody>
                    </table>
                </div>

                {
                    this.state.form && <DNS_Form title={this.state.form_title} addDNS={this.addDNS} />
                }
            </div>
        );
    }
}

export default ManualTab;




