const myLibrary = [];

        function Book(title, author, pages, read) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }

        Book.prototype.toggleReadStatus = function() {
            this.read = !this.read;
        };

        // Initial books
        let book1 = new Book('Beso', 'abebe', 234, true);
        let book2 = new Book('Koko', 'kokoo', 234, false);
        let book3 = new Book('Hoho', 'hohoo', 500, true);

        myLibrary.push(book1, book2, book3);

        function addToLibrary(title, author, pages, read) {
            let book = new Book(title, author, pages, read);
            myLibrary.push(book);
        }

        function listBooks() {
            const cardsContainer = document.querySelector('.grid-cont');
            cardsContainer.innerHTML = ''; // Clear the container content before appending new content

            myLibrary.forEach((book, index) => {
                let card = document.createElement('div');
                card.classList.add('card');
                card.dataset.index = index; // Set the data attribute to the index

                let h3 = document.createElement('h3');
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                let p3 = document.createElement('p');
                let rem = document.createElement('button');
                let toggle = document.createElement('button'); // Create a toggle button

                h3.textContent = book.title;
                p1.textContent = "Author: " + book.author;
                p2.textContent = "Pages: " + book.pages;
                p3.textContent = 'Have I read the book? ' + (book.read ? 'Yes' : 'No');

                rem.textContent = 'Remove';
                rem.addEventListener('click', () => {
                    const index = parseInt(card.dataset.index); // Get the index from data attribute
                    myLibrary.splice(index, 1); // Remove the book from the library
                    listBooks(); // Refresh the book list
                });

                toggle.textContent = 'Toggle Read Status';
                toggle.addEventListener('click', () => {
                    book.toggleReadStatus(); // Toggle the read status
                    listBooks(); // Refresh the book list
                });

                card.appendChild(h3);
                card.appendChild(p1);
                card.appendChild(p2);
                card.appendChild(p3);
                card.appendChild(rem);
                card.appendChild(toggle); // Append the toggle button

                cardsContainer.appendChild(card);
            });
        }

        document.querySelector('.list').addEventListener('click', listBooks);

        document.querySelector('.adbut').addEventListener('click', () => {
            document.querySelector('.dialog').showModal();
        });

        document.querySelector('.dialog form').addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.querySelector('#title').value;
            const author = document.querySelector('#author').value;
            const pages = document.querySelector('#pages').value;
            const read = document.querySelector('#read').checked;

            addToLibrary(title, author, pages, read);
            document.querySelector('.dialog').close();
            listBooks(); // List books after adding the new one
        });

        // Initially list books on page load
        document.addEventListener('DOMContentLoaded', listBooks);