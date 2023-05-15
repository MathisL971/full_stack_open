const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("http://localhost:3001/api/persons");
});

// Get all contacts
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Get info about contacts
app.get("/info", (req, res) => {
  const d = new Date();
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p><p>${d.toISOString()}</p>`
  );
});

// Get a specific contact
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => id === p.id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// Delete a specific contact
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

const generateId = () => {
  let maxId = 0;
  persons.forEach((p) => {
    if (maxId < p.id) {
      maxId = p.id;
    }
  });
  return maxId + 1;
};

// Create a contact
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if ([...persons.map((p) => p.name)].includes(body.name)) {
    return res.status(400).json({
      error: "name already exists",
    });
  }

  const contact = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(contact);
  res.json(contact);
});
