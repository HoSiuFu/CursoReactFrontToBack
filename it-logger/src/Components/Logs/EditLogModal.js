import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {updateLog, clearCurrent} from "../../Actions/logActions";
import M from 'materialize-css/dist/js/materialize.min';
import TechsToLogs from "../Techs/TechsToLogs";

const EditLogModal = ({log:{current}, updateLog, clearCurrent}) => {
    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState('');

    useEffect(() => {
        if(current){
            setMessage(current.message);
            setAttention(current.attention);
            setTech(current.tech)
        }
    }, [current]);

    const onSubmit = () => {
        if(message === '' || tech === ''){
            M.toast({html: 'Please enter message and tech'});
        } else {
            const updLog = {
                id: current.id,
                message,
                attention,
                tech,
                date: new Date()
            };

            updateLog(updLog);
            M.toast({html: `Log updated by ${tech}`});

            setMessage('');
            setTech('');
            setAttention(false);
            clearCurrent();
        }
    }

    return (
        <div id='edit-log-modal' className='modal' style={modalStyle}>
            <h4>Update System Log</h4>
            <div className="row">
                <div className='input-field'>
                    <input type='text' name='message' value={message}
                           onChange={(e) =>
                               setMessage(e.target.value)
                           }/>
                </div>
            </div>
            <div className="row">
                <div className='input-field'>
                    <select name="tech" value={tech} className='browser-default'
                            onChange={e => setTech(e.target.value)}>
                        <option value='' disabled>Select Technician</option>
                        <TechsToLogs></TechsToLogs>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className='input-field left-align'>
                    <p>
                        <label>
                            <input type='checkbox' className='filled-in' checked={attention}
                                   value={attention} onChange={e => setAttention(!attention)}/>
                            <span>Needs Attention</span>
                        </label>
                    </p>
                </div>
            </div>
            <div className='modal-footer'>
                <a href='#!' onClick={onSubmit}
                   className='modal-close waves-effect waves-green btn'>Enter</a>
            </div>
        </div>
    )
}

const modalStyle = {
    width: '75%',
    height: '75%'
};

EditLogModal.propTypes = {
    log: PropTypes.object.isRequired,
    updateLog: PropTypes.func.isRequired,
    clearCurrent: PropTypes.func.isRequired
}

const mapStateToProps = state =>  ({
    log: state.log
});

export default connect(mapStateToProps, {updateLog,clearCurrent})(EditLogModal);