import { db } from "./firebase-config.js";

import {
  collection,
  addDoc
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
      "notevault"
    );

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dlc5e2yca/raw/upload",
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

    await addDoc(collection(db, "notes"), {

      title,
      subject,
      semester,
      description,
      fileURL,
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