import { useState } from "react";
import SearchFilter from "./components/SearchFilter";
import NewContactForm from "./components/NewContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [persons, setPersons] = useState([
    { name: "Artos Hellas", number: "495-5555-4444" },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
      setPersons(persons.concat(newPerson));
    }
  };

  const handleTextFiltering = (event) => {
    setNewTextFilter(event.target.value);
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
      <ContactList contacts={persons} textFilter={newTextFilter}></ContactList>
    </div>
  );
}

export default App;
