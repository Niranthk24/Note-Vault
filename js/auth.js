import { auth, db }
from "./firebase-config.js";

import {

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import {

  doc,
  setDoc

}

from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

/* signup */

const signupBtn =
document.getElementById("signupBtn");

if (signupBtn) {

  signupBtn.addEventListener("click", async () => {

    const username =
    document.getElementById("signupUsername").value;

    const email =
    document.getElementById("signupEmail").value;

    const password =
    document.getElementById("signupPassword").value;

    try {

      const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user =
      userCredential.user;

      await setDoc(doc(db, "users", user.uid), {

        username,
        email,
        uploadsCount: 0

      });

      alert("account created");

      window.location.href =
      "login.html";

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  });

}

/* login */

const loginBtn =
document.getElementById("loginBtn");

if (loginBtn) {

  loginBtn.addEventListener("click", async () => {

    const email =
    document.getElementById("loginEmail").value;

    const password =
    document.getElementById("loginPassword").value;

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("login successful");

      window.location.href =
      "index.html";

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  });

}