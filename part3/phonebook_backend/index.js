const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Contact = require("./models/contact");

const app = express();

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static("build"));

// Get all contacts
app.get("/api/persons", (req, res) => {
  Contact.find({}).then((result) => {
    res.json(result);
  });
});

// Get info about contacts
app.get("/info", (req, res) => {
  const d = new Date();
  const n = Contact.find({}).then((result) => {
    return result.length;
  });
  res.send(
    `<p>Phonebook has info for ${n} people</p><p>${d.toISOString()}</p>`
  );
});

// Get a specific contact
app.get("/api/persons/:id", (req, res) => {
  Contact.findById(req.params.id).then((result) => {
    res.json(result);
  });
});

// Delete a specific contact
app.delete("/api/persons/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id).then((result) => {
    console.log(result);
  });
});

// Create a contact
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  // if ([...persons.map((p) => p.name)].includes(body.name)) {
  //   return res.status(400).json({
  //     error: "name already exists",
  //   });
  // }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact.save().then((savedContact) => {
    res.json(savedContact);
  });
});

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("http://localhost:3001/api/persons");
});
