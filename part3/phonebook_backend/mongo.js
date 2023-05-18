const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Password missing...");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://lefrancmathis:${password}@cluster1.gtrcer0.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// Create new schema
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Instantiate model of schema
const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 5) {
  const contact = new Contact({
    name,
    number,
  });

  contact.save().then((result) => {
    console.log(`Added ${name} with number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
  });
}
