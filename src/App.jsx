import { Component } from 'react'
import { nanoid } from 'nanoid'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter'

import css from './App.module.css'


class App extends Component {
	state = {
		contacts: [],
		filter: ''
	}
	
	componentDidMount() {
		const localData = localStorage.getItem('contacts');

		if (localData && JSON.parse(localData).length > 0) {
			this.setState({
				contacts: JSON.parse(localData),
			})
		}
		else {
			this.setState({
				contacts: [
					{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
					{id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
					{id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
					{id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
				],
			})
		}
	}

	componentDidUpdate() {
		localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
	}

	createContact = (name, number) => {
		const newContact = {
			name: name,
			number: number,
			id: nanoid(),
		}

		const isDuplicated = this.state.contacts.find((el) => el.name === name && el.number === number)
		if (isDuplicated) {
			return alert(`${name} is already in contacts.`)
		}
			
		this.setState((prev) => ({
			contacts: [...prev.contacts, newContact]})
		)
	}

	filterContact = (value) => { 
		this.setState(() => ({
			filter: value,
		}))
	}

	toDeleteContact = (id) => { 
		const index = this.state.contacts.findIndex(contact => contact.id === id)
		this.state.contacts.splice(index, 1);

		this.setState(() => ({
			contacts: this.state.contacts})
		)
    }
	
	render() {
		const {  contacts, filter } = this.state;
		return (
			<div className={css.wrapper}>
				<h1>Phonebook</h1>
				<ContactForm createContact={this.createContact} />

				<h2>Contacts</h2>
				<Filter filterContact={this.filterContact} contacts={contacts} />
				<ContactList contacts={contacts} filter={filter} toDeleteContact={this.toDeleteContact} />
			</div>
		)
	}
}


export default App