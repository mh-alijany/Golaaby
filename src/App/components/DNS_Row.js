import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSync, faCircle, faPowerOff } from '@fortawesome/free-solid-svg-icons';

function Options(props) {
    return (
        <a href="#" onClick={props.action} className={"mx-1 " + (props.action ? "" : "disabled")}>
            <FontAwesomeIcon icon={props.icon} />
        </a>
    )
}

export class DNS_Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'latency': props.DNS.latency
        }
    }

    updateLatency(latency) {
        this.setState({
            latency: latency
        })
    }

    render() {
        return (
            <tr>
                <td>
                    <Options icon={faPowerOff} action={this.props.connect} />
                    <Options icon={faSync} action={this.props.sync} />
                    <Options icon={faTrash} action={this.props.rm} />
                    <Options icon={faEdit} action={this.props.edit} />
                    {this.props.DNS.isEnable && <span className="float-left text-primary"><FontAwesomeIcon icon={faCircle} /></span>}
                </td>
                <td>
                    <span className={"badge text-light " + (this.state.latency ? "badge-success" : "badge-danger")}>
                        {this.state.latency || "نا مشخص"}
                    </span>
                </td>
                <td><a href={this.props.DNS.url} target="_blank">{this.props.DNS.name}</a></td>
            </tr>
        );
    }
}

export default DNS_Row;
