const booksDisplay = document.querySelector('#books');

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

function addToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    booksList.push(newBook);
}

function updateLibrary() {
    booksDisplay.innerHTML = '';
    booksList.forEach(book => {
        const row = document.createElement('tr');
        row.className = 'book';
        booksDisplay.appendChild(row);
        Object.values(book).forEach((value) => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
    });
}