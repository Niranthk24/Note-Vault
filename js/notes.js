import { auth, db } from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const notesGrid =
document.querySelector(".notes-grid");

const searchInput =
document.getElementById("searchInput");

let allNotes = [];

/* render notes */

function renderNotes(notes) {

  notesGrid.innerHTML = "";

  notes.forEach((note) => {

    const card =
    document.createElement("div");

    card.classList.add("note-card");

    card.innerHTML = `

      <div class="note-top">
        <span class="note-type">pdf</span>
        <span class="copies">archive</span>
      </div>

      <h3>${note.title}</h3>

      <p>
        ${note.subject} • semester ${note.semester}
      </p>
      <p>
        uploaded by ${note.uploadedBy}
      </p>
        

      <a
        href="${note.fileURL}"
        target="_blank"
        class="btn openBtn"
        style="display:inline-block; margin-top:20px;"
      >
        open
      </a>

    `;

    notesGrid.appendChild(card);

    const openBtn =
    card.querySelector(".openBtn");

    openBtn.addEventListener("click", (e) => {

  if (!auth.currentUser) {

    e.preventDefault();

    alert("login required");

    window.location.href =
    "login.html";

  }

});
  });

}

/* load notes */

async function loadNotes() {

  try {

    const querySnapshot =
    await getDocs(collection(db, "notes"));

    allNotes = [];

    querySnapshot.forEach((doc) => {

      allNotes.push(doc.data());

    });

    renderNotes(allNotes);

  } catch (error) {

    console.error(error);

  }

}

/* search */

searchInput.addEventListener("input", () => {

  const searchValue =
  searchInput.value.toLowerCase();

  const filteredNotes =
  allNotes.filter((note) => {

    return (

      note.title
      .toLowerCase()
      .includes(searchValue)

      ||

      note.subject
      .toLowerCase()
      .includes(searchValue)

      ||

      note.semester
      .toString()
      .includes(searchValue)

    );

  });

  renderNotes(filteredNotes);

});

loadNotes();