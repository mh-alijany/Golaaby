import DNS_Form from './components/DNS_Form';
import DNS_Row from './components/DNS_Row';

const ManualTab = (props) => {
    var [DNS_Info, setDNS_Info, HasUpdate, setHasUpdate] = props.DNS_Info;

    var rows = Object.values(DNS_Info.DNS_List).map((DNS) => <DNS_Row DNS={DNS} key={DNS.id} />);

    return (
        <div className={"tab-pane fade show active " + (props.isActive ? '' : "d-none")}>

            <div className="m-3 mt-5 rounded">

                <div className="d-flex mb-3 justify-content-between align-items-center">
                    <button type="button" className="btn btn-primary mx-3 my-2 ">افزودن</button>
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
                        {rows}
                    </tbody>
                </table>
            </div>

            <DNS_Form title="تست" display={true} />

        </div>
    );
}

export default ManualTab;




