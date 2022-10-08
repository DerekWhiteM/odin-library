const seedBooks = [
    {
        title: 'Book 1',
        author: 'Derek',
        isRead: false
    },
    {
        title: 'Book 2',
        author: 'Derek',
        isRead: false
    },
    {
        title: 'Book 3',
        author: 'Derek',
        isRead: false
    },
];

let myLibrary = [];

function Book(props) {
    this.title = props.title;
    this.author = props.author;
    this.isRead = props.isRead;
    this.addToLibrary = function() {
        myLibrary.push(this);
        displayLibrary();
    };
    this.toggleIsRead = function() {
        this.isRead? this.isRead = false : this.isRead = true;
        displayLibrary();
    };
}

seedBooks.forEach(obj => {
    myLibrary.push(new Book(obj));
});

function displayLibrary() {
    const library = document.querySelector('.library');
    let libraryItems = document.querySelector('.library__items');
    if (libraryItems) { libraryItems.remove(); }
    libraryItems = document.createElement('div');
    libraryItems.classList.add('library__items');
    library.appendChild(libraryItems);
    for (const book of myLibrary) {
        const element = document.createElement('p');
        element.classList.add('library__item');
        element.innerHTML = `
            <div>
                <p>Title: ${book.title}</p>
                <p>Author: ${book.author}</p>
                <p>Read: ${book.isRead}</p>
            </div>
            <button class="library__item__mark-read" data-index="${myLibrary.indexOf(book)}" onclick="toggleIsRead(this)">Toggle read</button>
            <button class="library__item__remove" data-index="${myLibrary.indexOf(book)}" onclick="handleRemove(this)">Remove</button>
        `;
        libraryItems.appendChild(element);
    }
}

const Form = {
    form: document.querySelector('.bookForm'),
    input: {
        title: document.getElementsByName('title')[0],
        author: document.getElementsByName('author')[0],
        isRead: document.getElementsByName('isRead')[0],
    },
    open: function () {
        this.form.style.display = 'flex';
    },
    close: function () {
        this.form.style.display = 'none';
        this.clear();
    },
    clear: function () {
        for (property in this.input) { 
            this.input[property].value = null; 
            this.input[property].checked = null;
        }
    },
    submit: function () {
        const book = new Book({
            title: this.input.title.value,
            author: this.input.author.value,
            isRead: this.input.isRead.checked,
        });
        book.addToLibrary();
        this.close();
    }
}

function handleRemove(btn) {
    myLibrary.splice(btn.dataset.index, 1);
    displayLibrary();
};

function toggleIsRead(btn) {
    const book = myLibrary.find(el => {
        return myLibrary.indexOf(el) == btn.dataset.index
    });
    book.toggleIsRead();
}

displayLibrary();