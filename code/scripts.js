const submitBtn = document.querySelector(".submit");
const bookTable = document.querySelector(".book-table");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read-status");

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  updateBookReadStatus(book) {
    book.readStatus = !book.readStatus;
  }

  deleteBook(bookToBeDeleted) {
    this.books = this.books.filter((book) => book.id != bookToBeDeleted.id);
  }
}

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

class UIrenderer {
  constructor() {
    this.tableBody = document.querySelector(".BT-body");
  }

  clearTable() {
    while (this.tableBody.firstChild) {
      this.tableBody.removeChild(this.tableBody.firstChild);
    }
  }

  renderBook(book) {
    const newRow = document.createElement("tr");
    this.tableBody.appendChild(newRow);

    ["title", "author", "pages"].forEach((prop) => {
      const newCell = document.createElement("td");
      newCell.textContent = book[prop];
      newRow.appendChild(newCell);
    });

    const readStatusCell = document.createElement("td");
    const readStatusInput = document.createElement("input");
    readStatusInput.type = "checkbox";
    readStatusInput.checked = book.status;
    readStatusInput.classList.add("readCHK");
    if (book.status == true) newRow.classList.add("read");
    readStatusInput.addEventListener("click", () =>
      handleReadStatusUpdate(book, newRow)
    );
    readStatusCell.appendChild(readStatusInput);
    newRow.appendChild(readStatusCell);

    const deleteCell = document.createElement("td");
    const deleteBTN = document.createElement("button");
    deleteBTN.textContent = "delete";
    deleteBTN.classList.add("deleteBTN");
    deleteBTN.addEventListener("click", () => handleDeleteBook(book, newRow));

    deleteCell.appendChild(deleteBTN);
    newRow.appendChild(deleteCell);
  }

  clearForm() {
    titleInput.value = null;
    authorInput.value = null;
    pagesInput.value = null;
    readInput.checked = false;
  }

  deleteBookRow(row) {
    row.remove();
  }

  rowColourChange(row) {
    row.classList.toggle("read");
  }
}

const myLibrary = new Library();
const myUIrenderer = new UIrenderer();

document.addEventListener("submit", (e) => {
  e.preventDefault();
  myLibrary.addBook(
    new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.checked
    )
  );
  myUIrenderer.clearTable();
  myLibrary.books.forEach((book) => myUIrenderer.renderBook(book));
  myUIrenderer.clearForm();
});

function handleDeleteBook(book, row) {
  myUIrenderer.deleteBookRow(row);
  myLibrary.deleteBook(book);
}

function handleReadStatusUpdate(book, row) {
  myUIrenderer.rowColourChange(row);
  myLibrary.updateBookReadStatus(book);
}
