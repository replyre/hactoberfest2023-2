const addBox = document.querySelector(".add-box .icon");
const popupBox = document.querySelector(".popup-box");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
const closePopupBox = document.querySelector(".popup-box header i");
const addBtn = document.querySelector("button");
addBtn.disabled = true;
let isUpdate = false,
  updateID;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

showNotes();
function showNotes() {
  document.querySelectorAll(".note").forEach((note) => {
    note.remove();
  });
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
        <div class="details">
          <p>${note.title}</p>
          <p>
            <span
              >${note.description}</span
            >
          </p>
        </div>

        <div class="bottom-container">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
              <li onclick="updateNote(${index},'${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
              <li onclick="deleteNote(${index})"><i class="uil uil-trash" ></i>Delete</li>
            </ul>
          </div>
        </div>
      </li>`;

    document.querySelector(".wrapper").insertAdjacentHTML("afterbegin", liTag);
  });
}

function showMenu(item) {
  item.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != item) {
      item.parentElement.classList.remove("show");
    }
  });
}

closePopupBox.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  document.querySelector(".popup-box header p").innerText = "Add a new note";
  popupBox.classList.remove("show");
});

function updateNote(id, title, desc) {
  addBox.click();
  isUpdate = true;
  updateID = id;
  document.querySelector(".popup-box header p").innerText = " Update the note";
  addBtn.innerText = "Update Note";
  console.log(id, title, desc);
  titleTag.value = title;
  descTag.value = desc;
  //   titleTag.value !== "undefined" ? (titleTag.value = title) : "";
  //   descTag.value !== "undefined" ? (descTag.value = desc) : "";
}

function deleteNote(id) {
  if (confirm("Delete this note ?")) {
    console.log("delete");
    notes.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
  }
}

titleTag.addEventListener("keydown", () => {
  if (titleTag.value.length > 1 || descTag.value.length > 1) {
    addBtn.style.cssText = "opacity:100%; cursor:pointer;";
    addBtn.disabled = false;
  } else {
    addBtn.style.cssText = "opacity:50%; cursor:not-allowed;";
    addBtn.disabled = true;
  }
});

descTag.addEventListener("keydown", () => {
  if (titleTag.value.length > 1 || descTag.value.length > 1) {
    addBtn.style.cssText = "opacity:100%; cursor:pointer;";
    addBtn.disabled = false;
  } else {
    addBtn.style.cssText = "opacity:50%; cursor:not-allowed;";
    addBtn.disabled = true;
  }
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (titleTag.value || descTag.value) {
    let date = new Date();
    months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

    let noteInfo = {
      title: titleTag.value,
      description: descTag.value,
      date:
        months[date.getMonth()] +
        " " +
        date.getDate() +
        "," +
        date.getFullYear(),
    };
    console.log(noteInfo);

    if (!isUpdate) notes.push(noteInfo);
    else {
      notes[updateID] = noteInfo;
      isUpdate = false;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    titleTag.value = "";
    descTag.value = "";
    closePopupBox.click();
    showNotes();
  }
});
