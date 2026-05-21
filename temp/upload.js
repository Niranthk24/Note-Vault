import { auth, db } from "./firebase-config.js";

import { cloudinaryConfig }
from "./config.js";

import {

  onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

  if (!user) {
    
    alert("login required");
    window.location.href =
    "login.html";

  }

});

import {
  collection,
  addDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

/* select file button */

const selectFileBtn =
document.getElementById("selectFileBtn");

const fileInput =
document.getElementById("fileInput");

const fileName =
document.getElementById("fileName");

fileInput.addEventListener("change", () => {

  if (fileInput.files.length > 0) {

    fileName.textContent =
    fileInput.files[0].name;

  }

});

selectFileBtn.addEventListener("click", () => {

  fileInput.click();

});

/* upload button */

const uploadBtn =
document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", async () => {

  const title =
  document.getElementById("title").value;

  const subject =
  document.getElementById("subject").value;

  const semester =
  document.getElementById("semester").value;

  const description =
  document.getElementById("description").value;

  const file =
  fileInput.files[0];

  if (!file) {

    alert("select a file first");

    return;

  }

  try {

    /* upload to cloudinary */

    const data = new FormData();

    data.append("file", file);

    data.append(
      "upload_preset",
      cloudinaryConfig.uploadPreset
    );

  const response = await fetch(
  `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: "POST",
        body: data
      }
    );

    const result =
    await response.json();

    const fileURL =
    result.secure_url;
    console.log(fileURL)
    /* save metadata to firestore */
    const currentUser = auth.currentUser;

    const userDoc = await getDoc(
      doc(db, "users", currentUser.uid)
    );

    const userData = userDoc.data();

    await addDoc(collection(db, "notes"), {

      title,
      subject,
      semester,
      description,
      fileURL,
      uploadedBy:userData.username,
      createdAt: new Date()

    });
    document.getElementById("title").value = "";

    document.getElementById("subject").value = "";

    document.getElementById("semester").value = "";

    document.getElementById("description").value = "";

    fileInput.value = "";

    fileName.textContent =
    "no file selected";

    alert("uploaded successfully");

  } catch (error) {

    console.error(error);

    alert("upload failed");

  }

});