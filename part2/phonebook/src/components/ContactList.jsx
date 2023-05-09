import React from "react";
import Contact from "./Contact";

const ContactList = (props) => {
  const filteredPersons = props.contacts.filter((element) => {
    return element.name.toLowerCase().includes(props.textFilter.toLowerCase());
  });

  return (
    <div>
      {filteredPersons.map((person) => (
        <Contact
          key={person.name}
          name={person.name}
          number={person.number}
          handleDelete={() => props.handleContactDelete(person.id)}
        ></Contact>
      ))}
    </div>
  );
};

export default ContactList;
