import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import NewContactForm from "./components/NewContactForm";
import ContactList from "./components/ContactList";
import contact from "./services/contact";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newTextFilter, setNewTextFilter] = useState("");

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
      if (JSON.stringify(element) === JSON.stringify(newPerson)) {
        contactAlreadyExists = true;
      }
    });

    if (contactAlreadyExists) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      contact.create(newPerson).then((newResource) => {
        setPersons(persons.concat(newResource));
      });
    }
  };

  const handleTextFiltering = (event) => {
    setNewTextFilter(event.target.value);
  };

  useEffect(() => {
    contact.getAll().then((storedContacts) => {
      setPersons(storedContacts);
    });
  }, []);

  const handleContactDelete = (id) => {
    contact.deleted(id).then((deletedResource) => {
      contact.getAll();
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
