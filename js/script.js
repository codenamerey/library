const booksDisplay = document.querySelector('#books');
const formTrigger = document.querySelector('#form-trigger');
const bookForm = document.querySelector('#add-book-form');
const addBookButton = document.querySelector('#add-book');


let booksList = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.toggleReadStatus = function() {
    this.readStatus = !this.readStatus;
}

function addToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    booksList.push(newBook);
}

function updateLibrary() {
    let id = 0;
    let button_id = 0;
    booksDisplay.innerHTML = '';
    booksList.forEach(book => {
        const row = document.createElement('tr');
        row.className = 'book';
        booksDisplay.appendChild(row);
        Object.values(book).forEach((value) => {
            if(value === true || value === false) {
                const button_switch = document.createElement('input');
                button_switch.type = 'checkbox';
                button_switch.classList.add('readStatus');
                if(value == true) {
                    button_switch.classList.add('checked');
                }
                button_switch.id = button_id;
                button_id++;
                button_switch.addEventListener('click', toggleReadStatus);
                row.appendChild(button_switch);
                return;
            }
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        const delete_cell = document.createElement('td');
        const delete_button = document.createElement('button');
        delete_button.textContent = 'Delete';
        delete_button.id = id;
        delete_button.className = 'delete_buttons';
        delete_button.addEventListener('click', deleteFromLibrary);
        delete_cell.appendChild(delete_button);
        row.appendChild(delete_cell);
        id++;
    });
}

function toggleReadStatus(e) {
    e.target.classList.toggle('checked');
    let book = booksList[e.target.id];
    book.toggleReadStatus();
}

function deleteFromLibrary(e) {
    booksList.splice(e.target.id, 1);
    updateLibrary();
}

addToLibrary('Harry Potter', 'J.K. Rowling', 200, true);
addToLibrary('dawd','dawda', 'true', false);
updateLibrary();

formTrigger.addEventListener('click', () => {
    bookForm.classList.add('active');
    document.body.classList.add('active');
});

addBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    let title = bookForm.querySelector('input[id="title"]').value;
    let author = bookForm.querySelector('input[id="author"]').value;
    let pages = bookForm.querySelector('input[id="pages"]').value;
    let readStatus = bookForm.querySelector('input[id="readStatus"]').checked;
    addToLibrary(title, author, pages, readStatus);
    bookForm.classList.remove('active');
    document.body.classList.remove('active');
    updateLibrary();
});

