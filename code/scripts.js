const myLibrary = [];
const submitBtn = document.querySelector(".submit");
const bookTable = document.querySelector(".book-table");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read-status");

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    let status ;

    if (readInput.checked == true)
        status = 'yes';
    else if (readInput.checked == false) {
        status = 'no';
    }

    const book = new Book(title, author, pages, status);
    console.log(book.status);
    myLibrary.push(book);
}

function tableUpdate() {
    const tableBody = document.querySelector(".BT-body");
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    for (let book of myLibrary) {
        const newRow = document.createElement("tr");
        tableBody.appendChild(newRow);

        for (let property in book) {
            const newCell = document.createElement('td');
            newCell.textContent = book[property];
            newRow.appendChild(newCell);
        }
    }
}



submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
    tableUpdate();
})