let myLibrary = [];
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
        status = true;
    else if (readInput.checked == false) {
        status = false;
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

            if (property === 'status') {
                const readCheckBox = document.createElement('input');
                readCheckBox.type = 'checkbox';

                if (book[property] === true) {
                    readCheckBox.checked = true;
                    newRow.classList.toggle('read');
                } else if (book[property] === false) {
                    readCheckBox.checked = false;
                    newRow.classList.toggle('unread');
                }
                        
                readCheckBox.classList.toggle('readCHK')
                newCell.appendChild(readCheckBox);  
            } else {
                newCell.textContent = book[property];
            }
            
            newRow.appendChild(newCell);
        }

        const deleteCell = document.createElement('td');
        const deleteBTN = document.createElement('button');
        deleteBTN.textContent = 'delete';
        deleteBTN.classList.toggle('deleteBTN');
        deleteCell.appendChild(deleteBTN);
        newRow.appendChild(deleteCell);
    }
}

function clearForm() {
    titleInput.value = null;
    authorInput.value = null;
    pagesInput.value = null;
    readInput.checked = false;
}

function deleteBook(e) {
    const tableElement = e.target

    if (tableElement.classList.contains('deleteBTN')) {
        const bookToBeDeleted = e.target.parentElement.parentElement;
        const IDofBookToBeDeleted = bookToBeDeleted.firstChild.textContent;
        myLibrary = myLibrary.filter((book) => book.id != IDofBookToBeDeleted)
        tableElement.closest('tr').remove();
    };
}

function updateReadStatus(e) {
    const tableElement = e.target

    if (tableElement.classList.contains('readCHK')) {
        const bookToBeUpdated = e.target.parentElement.parentElement;
        const IDofBookToBeUpdated = bookToBeUpdated.firstChild.textContent;

        myLibrary = myLibrary.map((book) => {
            if (book.id === IDofBookToBeUpdated) {
                book.status = !book.status;
                colourChange(bookToBeUpdated);
            }
            
            return book;
        })
    }
}

function colourChange (row) {
    row.classList.toggle('read');
    row.classList.toggle('unread');
}


document.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    tableUpdate();
    clearForm();
})

bookTable.addEventListener('click', (e) => {
    deleteBook(e);
    updateReadStatus(e)
})