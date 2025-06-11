let myLibrary = [];
const submitBtn = document.querySelector(".submit");
const bookTable = document.querySelector(".book-table");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read-status");

class Book {
  constructor(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
  set readStatus(value) {
    this.status = value;
  }
}

function clearTable() {
  const tableBody = document.querySelector(".BT-body");
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

function addBookToTable(book) {
  const tableBody = document.querySelector(".BT-body");
  const newRow = document.createElement("tr");
  tableBody.appendChild(newRow);

  for (let property in book) {
    const newCell = document.createElement("td");

    if (property === "status") {
      const readCheckBox = document.createElement("input");
      readCheckBox.addEventListener("click", () => {
        book.readStatus = readCheckBox.checked;
        colourChange(readCheckBox.parentElement.parentElement);
        tableUpdate();
      });
      readCheckBox.type = "checkbox";

      if (book[property] === true) {
        readCheckBox.checked = true;
        newRow.classList.add("read");
      }
      readCheckBox.classList.add("readCHK");
      newCell.appendChild(readCheckBox);
    } else {
      newCell.textContent = book[property];
    }

    newRow.appendChild(newCell);
  }

  const deleteCell = document.createElement("td");
  const deleteBTN = document.createElement("button");
  deleteBTN.textContent = "delete";
  deleteBTN.classList.add("deleteBTN");
  deleteBTN.addEventListener("click", () => deleteBook(book, newRow));

  deleteCell.appendChild(deleteBTN);
  newRow.appendChild(deleteCell);
}

function clearForm() {
  titleInput.value = null;
  authorInput.value = null;
  pagesInput.value = null;
  readInput.checked = false;
}

function deleteBook(bookToBeDeleted, row) {
  myLibrary = myLibrary.filter((book) => book.id != bookToBeDeleted.id);
  row.remove();
}

function colourChange(row) {
  row.classList.toggle("read");
}

document.addEventListener("submit", (e) => {
  e.preventDefault();
  myLibrary.push(
    new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.checked
    )
  );
  clearTable();
  myLibrary.forEach((book) => addBookToTable(book));
  clearForm();
});
