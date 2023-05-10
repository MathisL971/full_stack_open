import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import NewContactForm from "./components/NewContactForm";
import ContactList from "./components/ContactList";
import contact from "./services/contact";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newTextFilter, setNewTextFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    let contactAlreadyExists = false;
    persons.forEach((element) => {
      if (element.name === newPerson.name) {
        contactAlreadyExists = true;
      }
    });

    if (contactAlreadyExists) {
      if (
        window.confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with the new one ?`
        )
      ) {
        const oldContact = persons.find((p) => p.name === newPerson.name);
        contact.update(oldContact.id, newPerson).then((updatedContact) => {
          const updatedContacts = persons.map((p) =>
            p.id !== updatedContact.id ? p : updatedContact
          );
          setPersons(updatedContacts);
          setErrorMessage(`Replaced number of ${updatedContact.name}!`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
      }
    } else {
      contact.create(newPerson).then((newResource) => {
        setPersons(persons.concat(newResource));
        setErrorMessage(`${newPerson.name}'s number was added!`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
    }
  };

  const handleTextFiltering = (event) => {
    setNewTextFilter(event.target.value);
  };

  const handleContactDelete = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      contact.deleted(id).then(() => {
        const updatedContacts = persons.filter((p) => p.id !== id);
        setPersons(updatedContacts);
      });
    }
  };

  useEffect(() => {
    contact.getAll().then((storedContacts) => {
      setPersons(storedContacts);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}></Notification>
      <NewContactForm
        onSubmit={handleNameSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      ></NewContactForm>
      <h2>Contacts</h2>
      <SearchFilter onChangeHandler={handleTextFiltering}></SearchFilter>
      <ContactList
        contacts={persons}
        textFilter={newTextFilter}
        handleContactDelete={handleContactDelete}
      ></ContactList>
    </div>
  );
}

export default App;
