import React, {useContext, useRef, useEffect} from 'react';
import ContactContext from '../../Context/Contact/contactContext';

export const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContacts, clearFilter, filtered} = contactContext;
    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = ''
        }
    });

    const onChange = (e) => {
        e.preventDefault();
        if(text.current.value !== '')
            filterContacts(e.target.value);
        else
            clearFilter();
    }

    return (
        <form>
            <input ref={text} type='text' placeholder='Filter Contacts' onChange={onChange}/>
        </form>
    )
}

export default ContactFilter;