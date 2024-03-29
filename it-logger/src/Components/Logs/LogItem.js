import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {deleteLog, setCurrent} from "../../Actions/logActions";
import Moment from "react-moment";
import M from 'materialize-css/dist/js/materialize.min';

const LogItem = ({log, deleteLog, setCurrent}) => {
    const onDelete = () => {
        deleteLog(log.id);
        M.toast({ html:`Log ${log.id} successfully deleted`});
    }

    return(
        <li className='collection-item'>
            <div>
                <a href="#edit-log-modal" onClick={() => setCurrent(log)}
                   className={`modal-trigger ${log.attention ? 'red-text': 'blue-text'}`}>
                    {log.message}
                </a>
                <br/>
                <span className='grey-text'>
                    <span className='black-text'>ID #{log.id}</span> last updated by{' '}
                    <span className='black-text'>{log.tech}</span> on{' '}
                    <Moment format ="DD/MM/YYYY"></Moment>
                </span>
                <a href="#!" onClick={onDelete} className="secondary-content">
                    <i className='material-icons grey-text'>delete</i>
                </a>
            </div>
        </li>
    );
}

LogItem.propTypes = {
    log: PropTypes.object.isRequired,
    deleteLog: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired
}

LogItem.propTypes = {
    log: PropTypes.object.isRequired,
}

export default connect(null, {deleteLog, setCurrent})(LogItem);