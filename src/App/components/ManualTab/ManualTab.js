import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSync } from '@fortawesome/free-solid-svg-icons';

function Options(props) {
    return (
        <a href="#" onClick={props.action} className="mx-1">
            <FontAwesomeIcon icon={props.icon} />
        </a>
    )
}

const ManualTab = (props) => {
    var [DNS_Info, setDNS_Info, HasUpdate, setHasUpdate] = props.DNS_Info;

    var rows = Object.values(DNS_Info.DNS_List).map((DNS) =>
        <tr key={DNS.id}>
            <td>
                <Options icon={faSync} action={() => { }} />
                {/* <Options icon={faEdit} action={() => { }} />
                <Options icon={faTrash} action={() => { }} /> */}
            </td>
            <td>
                <span className={"badge text-light " + (DNS.latency ? "badge-success" : "badge-danger")}>
                    {DNS.latency || "درحال برسی"}
                </span>
            </td>
            <td><a href={DNS.url} target="_blank">{DNS.name}</a></td>
        </tr>
    );

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

            

        </div>
    );
}

export default ManualTab;




