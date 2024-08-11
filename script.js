class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }

    listBooks() {
        const cardsContainer = document.querySelector('.grid-cont');
        cardsContainer.innerHTML = '';

        this.books.forEach((book, index) => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = index;

            let h3 = document.createElement('h3');
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            let p3 = document.createElement('p');
            let rem = document.createElement('button');
            let toggle = document.createElement('button');

            h3.textContent = book.title;
            p1.textContent = "Author: " + book.author;
            p2.textContent = "Pages: " + book.pages;
            p3.textContent = 'Have I read the book? ' + (book.read ? 'Yes' : 'No');

            rem.textContent = 'Remove';
            rem.addEventListener('click', () => {
                this.removeBook(index);
                this.listBooks(); 
            });

            toggle.textContent = 'Toggle Read Status';
            toggle.addEventListener('click', () => {
                book.toggleReadStatus();
                this.listBooks();
            });

            card.appendChild(h3);
            card.appendChild(p1);
            card.appendChild(p2);
            card.appendChild(p3);
            card.appendChild(rem);
            card.appendChild(toggle);

            cardsContainer.appendChild(card);
        });
    }
}

// Initialize library and add initial books
const library = new Library();
library.addBook(new Book('Beso', 'abebe', 234, true));
library.addBook(new Book('Koko', 'kokoo', 234, false));
library.addBook(new Book('Hoho', 'hohoo', 500, true));

document.querySelector('.list').addEventListener('click', () => library.listBooks());

document.querySelector('.adbut').addEventListener('click', () => {
    document.querySelector('.dialog').showModal();
});

document.querySelector('.dialog form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    library.addBook(new Book(title, author, pages, read));
    document.querySelector('.dialog').close();
    library.listBooks();
});

document.addEventListener('DOMContentLoaded', () => library.listBooks());
