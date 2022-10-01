const booksDisplay = document.querySelector('#books');
const formTrigger = document.querySelector('#form-trigger');
const bookForm = document.querySelector('#add-book-form');

let booksList = [
    {
        title: "Harry Potter",
        author: "J.K. Rowling",
        pages: "200",
        readStatus: true
    }
]

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
    booksDisplay.innerHTML = '';
    booksList.forEach(book => {
        const row = document.createElement('tr');
        row.className = 'book';
        booksDisplay.appendChild(row);
        bookLoop:
        Object.values(book).forEach((value) => {
            let id = 0;
            if(value == true || value == false) {
                const button_switch = document.createElement('input');
                button_switch.type = 'checkbox';
                button_switch.classList.add('readStatus');
                if(value == true) {
                    button_switch.classList.add('checked');
                }
                button_switch.id = id;
                button_switch.addEventListener('click', toggleReadStatus);
                row.appendChild(button_switch);
                id++;
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
        delete_cell.appendChild(delete_button);
        row.appendChild(delete_cell);
        id++;
    });
}

function toggleReadStatus(e) {
    e.target.classList.toggle('checked');
    const book = booksList[e.target.id];
    book.toggleReadStatus();
}

addToLibrary('dawd','dawda', 'true', false);
updateLibrary();
formTrigger.addEventListener('click', () => {
    bookForm.classList.add('active');
    document.body.classList.add('active');
});

