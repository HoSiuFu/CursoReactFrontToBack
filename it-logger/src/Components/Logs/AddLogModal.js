import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min';
import {addLog} from "../../Actions/logActions";
import {getTechs} from "../../Actions/techActions";
import TechsToLogs from "../Techs/TechsToLogs";


const AddLogModal = ({tech:{techs}, addLog, getTechs}) => {
    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState('');

    const onSubmit = () => {
        if(message === '' || tech === ''){
            M.toast({html: 'Please enter message and tech'});
        } else {
            const newLog = {
                message,
                attention,
                tech,
                date: new Date()
            }

            addLog(newLog);

            M.toast({html: `Log added by ${tech}`});

            setMessage('');
            setAttention(false)
            setTech('');
        }
    }

    return (
        <div id='add-log-modal' className='modal' style={modalStyle}>
            <h4>Enter System Log</h4>
            <div className="row">
                <div className='input-field'>
                    <input type='text' name='message' value={message}
                           onChange={(e) =>
                               setMessage(e.target.value)
                           }/>
                    <label htmlFor='message' className='active'>
                        Log Message
                    </label>
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

AddLogModal.propTypes = {
    tech: PropTypes.object.isRequired,
    addLog: PropTypes.func.isRequired,
    getTechs: PropTypes.func.isRequired
}

const modalStyle = {
    width: '75%',
    height: '75%'
}
const mapStateToProps = state => ({
    tech: state.tech
});

export default connect(mapStateToProps, {addLog, getTechs})(AddLogModal);