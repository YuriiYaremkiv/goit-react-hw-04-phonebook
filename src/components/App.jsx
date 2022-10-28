import { useState } from 'react';
import css from './app.module.scss';

import useLocalStorage from '../components/hooks/useLocalStorage';

import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from '../components/ContactList/ContactList';

const shortid = require('shortid');

export function App() {
  const [contacts, getContacts] = useLocalStorage('contacts', []);
  const [filter, getFilter] = useState('');

  const handleSubmit = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert('This contact already exists');
      return;
    }
    getContacts(prevState => [
      { id: shortid.generate(), name, number },
      ...prevState,
    ]);
  };

  const handleFilter = e => {
    getFilter(e.target.value.trim().toLocaleLowerCase());
  };

  const deleteContact = contactId => {
    getContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  const filterContact = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(filter)
  );

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmitTo={handleSubmit} />

      {contacts.length !== 0 && (
        <>
          <h2>Contacts</h2>
          <div className={css.contacts__container}>
            <Filter onChange={handleFilter} />
            <ContactList contacts={filterContact} delContact={deleteContact} />
          </div>
        </>
      )}
    </div>
  );
}