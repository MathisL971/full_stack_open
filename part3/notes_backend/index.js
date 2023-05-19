const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Note = require("./models/note");

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

// Get all notes
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// Get a specific note
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

// Create a note
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((result) => {
    response.json(result);
  });
});

// Delete a note
app.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndDelete(request.params.id).then((result) => {
    console.log(result);
  });
});

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
