import { db } from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const notesGrid =
document.querySelector(".notes-grid");

async function loadNotes() {

  try {

    const querySnapshot =
    await getDocs(collection(db, "notes"));

    notesGrid.innerHTML = "";

    querySnapshot.forEach((doc) => {

      const note = doc.data();

      const card = document.createElement("div");

      card.classList.add("note-card");

      card.innerHTML = `
      
        <div class="note-top">
          <span class="note-type">pdf</span>
          <span class="copies">archive</span>
        </div>

        <h3>${note.title}</h3>

        <p>${note.subject} • semester ${note.semester}</p>

        <a
          href="${note.fileURL}"
          target="_blank"
          class="btn"
          style="display:inline-block; margin-top:20px;"
        >
          open
        </a>

      `;

      notesGrid.appendChild(card);

    });

  } catch (error) {

    console.error(error);

  }

}

loadNotes();