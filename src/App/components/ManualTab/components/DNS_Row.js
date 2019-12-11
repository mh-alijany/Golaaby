import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSync } from '@fortawesome/free-solid-svg-icons';

function Options(props) {
    return (
        <a href="#" onClick={props.action} className="mx-1">
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
                    <Options icon={faSync} action={this.props.updateLatency} />
                    {/* <Options icon={faEdit} action={() => { }} />
                        <Options icon={faTrash} action={() => { }} /> */}
                </td>
                <td>
                    <span className={"badge text-light " + (this.state.latency ? "badge-success" : "badge-danger")}>
                        {this.state.latency || "درحال برسی"}
                    </span>
                </td>
                <td><a href={this.props.DNS.url} target="_blank">{this.props.DNS.name}</a></td>
            </tr>
        );
    }
}

export default DNS_Row;
