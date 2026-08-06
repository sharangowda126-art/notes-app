const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

const FILE = path.join(__dirname, "notes.json");

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get all notes
app.get("/notes", (req, res) => {
    let notes = [];

    if (fs.existsSync(FILE)) {
        notes = JSON.parse(fs.readFileSync(FILE, "utf8"));
    }

    res.json(notes);
});

// Add note
app.post("/notes", (req, res) => {
    let notes = [];

    if (fs.existsSync(FILE)) {
        notes = JSON.parse(fs.readFileSync(FILE, "utf8"));
    }

    const newNote = {
        id: Date.now(),
        text: req.body.text
    };

    notes.push(newNote);

    fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));

    res.json(newNote);
});

// Delete note
app.delete("/notes/:id", (req, res) => {
    let notes = [];

    if (fs.existsSync(FILE)) {
        notes = JSON.parse(fs.readFileSync(FILE, "utf8"));
    }

    notes = notes.filter(note => note.id != req.params.id);

    fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));

    res.json({ message: "Note deleted" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});