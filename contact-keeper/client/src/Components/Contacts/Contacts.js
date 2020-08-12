import React, {Fragment, useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ContactContext from '../../Context/Contact/contactContext';
import ContactItem from "./ContactItem";
import Spinner from "../Layout/Spinner";

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {getContacts, loading, contacts, filteredContacts} = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, []);

    if (contacts && contacts.length === 0 && !loading) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                    {filteredContacts !== null ? filteredContacts.map((contact) =>
                            <CSSTransition key={contact._id} timeout={1000} classNames='item'>
                                <ContactItem contact={contact}></ContactItem>
                            </CSSTransition>)
                        : contacts.map((contact) =>
                            <CSSTransition key={contact._id} timeout={1000} classNames='item'>
                                <ContactItem contact={contact}></ContactItem>
                            </CSSTransition>
                        )}
                </TransitionGroup>
            ) : <Spinner/>}
        </Fragment>
    )
}

export default Contacts;