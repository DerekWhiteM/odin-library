let myLibrary = [
    { title: 'Book 1' },
    { title: 'Book 2' },
    { title: 'Book 3' },
];

function Book(props) {
    this.title = props.title;
    this.author = props.author;
    this.addToLibrary = function() {
        myLibrary.push(this);
        displayLibrary();
    }
}

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
        element.textContent = book.title;
        libraryItems.appendChild(element);
    }
}

const Form = {
    form: document.querySelector('.bookForm'),
    input: {
        title: document.getElementsByName('title')[0],
        author: document.getElementsByName('author')[0],
    },
    open: function() {
        this.form.style.display = 'flex';
    },
    close: function() {
        this.form.style.display = 'none';
        this.clear();
    },
    clear: function() {
        for (property in this.input) { this.input[property].value = ''; }
    },
    submit: function() {
        const book = new Book({
            title: this.input.title.value,
            author: this.input.author.value
        });
        book.addToLibrary();
        this.close();
    }
}

displayLibrary();