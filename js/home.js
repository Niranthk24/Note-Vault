import { db }
from "./firebase-config.js";

import {

  collection,
  getDocs

}

from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

async function loadStats() {

  /* notes count */

  const notesSnapshot =
  await getDocs(
    collection(db, "notes")
  );

  document.getElementById(
    "notesCount"
  ).textContent =
  notesSnapshot.size;

  /* users count */

  const usersSnapshot =
  await getDocs(
    collection(db, "users")
  );

  document.getElementById(
    "usersCount"
  ).textContent =
  usersSnapshot.size;

}

loadStats();