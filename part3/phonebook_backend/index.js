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

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(requestLogger);

// Get all contacts
app.get("/api/persons", (req, res) => {
  Contact.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

// Get info about contacts
app.get("/info", (req, res) => {
  Contact.find({}).then((contacts) => {
    res.send(
      `<p>Phonebook has info for ${
        contacts.length
      } people</p><p>${new Date().toISOString()}</p>`
    );
  });
});

// Get a specific contact
app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Create a contact or update an existing contact
app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then((savedContact) => {
      res.json(savedContact);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Contact.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

// Delete a specific contact
app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("http://localhost:3001/api/persons");
});
