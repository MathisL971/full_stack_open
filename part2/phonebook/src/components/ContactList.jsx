import React from "react";
import Contact from "./Contact";

const ContactList = ({ contacts, textFilter, handleContactDelete }) => {
  const filteredPersons = contacts.filter((element) => {
    return element.name.toLowerCase().includes(textFilter.toLowerCase());
  });

  return (
    <div>
      {filteredPersons.map((person) => (
        <Contact
          key={person.name}
          name={person.name}
          number={person.number}
          handleDelete={() => handleContactDelete(person.id)}
        ></Contact>
      ))}
    </div>
  );
};

export default ContactList;
