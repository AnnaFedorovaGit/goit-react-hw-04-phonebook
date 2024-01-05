import { useState, useEffect } from 'react' 
import { nanoid } from 'nanoid'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter'

import css from './App.module.css'


const App = () => {
	
	const [contacts, setContacts] = useState([]);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		const localData = localStorage.getItem('contacts');

		if (localData && JSON.parse(localData).length > 0) {
			setContacts(JSON.parse(localData));
		} else {
			setContacts([
				{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
				{id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
				{id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
				{id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
			]);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}, [contacts]);

	const createContact = (name, number) => {
		const newContact = {
			name: name,
			number: number,
			id: nanoid(),
		}

		const isDuplicated = contacts.find((el) => el.name === name && el.number === number)
		if (isDuplicated) {
			return alert(`${name} is already in contacts.`)
		}
			
		setContacts((prev) => ([ ...prev, newContact ]));
	}

	const filterContact = (value) => { 
		setFilter(value);
	}

	const toDeleteContact = (id) => { 
		const index = contacts.findIndex(contact => contact.id === id)
		contacts.splice(index, 1);
		
		setContacts([ ...contacts]);
    }
	
	return (
		<div className={css.wrapper}>
			<h1>Phonebook</h1>
			<ContactForm createContact={createContact} />

			<h2>Contacts</h2>
			<Filter filterContact={filterContact} contacts={contacts} />
			<ContactList contacts={contacts} filter={filter} toDeleteContact={toDeleteContact} />
		</div>
	)
}


export default App