import { auth }
from "./firebase-config.js";

import {

  onAuthStateChanged,

  signOut

}

from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const authLinks =
document.getElementById("authLinks");

const userLinks =
document.getElementById("userLinks");

const logoutBtn =
document.getElementById("logoutBtn");

/* auth state */

onAuthStateChanged(auth, (user) => {

  if (user) {

    authLinks.style.display =
    "none";

    userLinks.style.display =
    "flex";

  }

  else {

    authLinks.style.display =
    "flex";

    userLinks.style.display =
    "none";

  }

});

/* logout */

logoutBtn?.addEventListener("click", async () => {

  await signOut(auth);

  window.location.href =
  "login.html";

});