import { auth, db }
from "./firebase-config.js";

import {

  onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import {

  doc,
  getDoc

}

from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

  if (!user) {

    window.location.href =
    "login.html";

    return;

  }

  const userDoc =
  await getDoc(
    doc(db, "users", user.uid)
  );

  const userData =
  userDoc.data();

  document.getElementById(
    "profileUsername"
  ).textContent =
  userData.username;

  document.getElementById(
    "profileEmail"
  ).textContent =
  userData.email;

  document.getElementById(
    "profileUploads"
  ).textContent =
  userData.uploadsCount;

  document.getElementById(
    "memberSince"
  ).textContent =
  new Date(
    user.metadata.creationTime
  ).toLocaleDateString("en-GB");

  document.querySelector(
    ".profile-pfp"
  ).textContent =
  userData.username
  .charAt(0)
  .toUpperCase();

});