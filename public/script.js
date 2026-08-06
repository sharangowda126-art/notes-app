const api = "/notes";

async function loadNotes() {
    const response = await fetch(api);
    const notes = await response.json();

    const list = document.getElementById("notesList");
    list.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${note.text}
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;

        list.appendChild(li);
    });
}

async function addNote() {
    const input = document.getElementById("noteInput");

    if (input.value.trim() === "") {
        alert("Please enter a note.");
        return;
    }

    await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: input.value
        })
    });

    input.value = "";
    loadNotes();
}

async function deleteNote(id) {
    await fetch(api + "/" + id, {
        method: "DELETE"
    });

    loadNotes();
}

loadNotes();