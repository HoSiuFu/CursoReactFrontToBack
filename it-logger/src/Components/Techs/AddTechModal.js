import React, {useState} from "react";
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min';
import {connect} from "react-redux";
import {addTech} from "../../Actions/techActions";

const AddTechModal = ({addTech}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const onSubmit = () => {
        if (firstName === '' || lastName === '') {
            M.toast({html: 'Please enter first and last name'});
        } else {
            const newTech = {
                firstName,
                lastName
            }

            addTech(newTech);

            M.toast({html: 'Technician successfully added'});

            setFirstName('');
            setLastName('');
        }
    }

    return (
        <div id='tech-modal' className='modal'>
            <h4>New Technician</h4>
            <div className="row">
                <div className='input-field'>
                    <input type='text' name='firstName' value={firstName}
                           onChange={(e) =>
                               setFirstName(e.target.value)
                           }/>
                    <label htmlFor='message' className='active'>
                        First Name
                    </label>
                </div>
            </div>
            <div className="row">
                <div className='input-field'>
                    <input type='text' name='lastName' value={lastName}
                           onChange={(e) =>
                               setLastName(e.target.value)
                           }/>
                    <label htmlFor='message' className='active'>
                        Last Name
                    </label>
                </div>
            </div>
            <div className='modal-footer'>
                <a href='#!' onClick={onSubmit}
                   className='modal-close waves-effect waves-green btn'>Enter</a>
            </div>
        </div>
    )
}

AddTechModal.propTypes = {
    addTech: PropTypes.func.isRequired
}

export default connect(null, {addTech})(AddTechModal);