const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const FILE = "notes.json";

// Get all notes
app.get("/notes", (req, res) => {
    let notes = [];

    if (fs.existsSync(FILE)) {
        notes = JSON.parse(fs.readFileSync(FILE));
    }

    res.json(notes);
});

// Add a note
app.post("/notes", (req, res) => {
    let notes = [];

    if (fs.existsSync(FILE)) {
        notes = JSON.parse(fs.readFileSync(FILE));
    }

    const newNote = {
        id: Date.now(),
        text: req.body.text
    };

    notes.push(newNote);

    fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));

    res.json(newNote);
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
    let notes = [];

    if (fs.existsSync(FILE)) {
        notes = JSON.parse(fs.readFileSync(FILE));
    }

    notes = notes.filter(note => note.id != req.params.id);

    fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));

    res.json({ message: "Note deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});