// Global variable (database)
let library = [];

// Create book
function Book(name, author, genre, read) {
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.read = read;
}

// Create function to add book
Book.prototype.add = function() {
    library.push(this);
    loadLibrary();
}

// Load the books when loaded

function loadLibrary() {
    const bookshelf = document.getElementById('library');
    bookshelf.innerHTML = ''; //Wipe out contents of the bookshelf before updating it

    library.forEach((book) => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'bookEntry';
      
      //Add title
      const bookTitle = document.createElement('div');
      const bookTitle2 = document.createElement('div');
      bookTitle2.textContent = "Title";
      bookTitle.className = 'bookTitle';
      bookTitle.textContent = book.name;
      bookDiv.appendChild(bookTitle2);
      bookDiv.appendChild(bookTitle);
      //Add Author
      const bookAuthor = document.createElement('div');
      const bookAuthor2 = document.createElement('div');
      bookAuthor2.textContent = "Author";
      bookAuthor.className = 'bookAuthor';
      bookAuthor.textContent = book.author;
      bookDiv.appendChild(bookAuthor2);
      bookDiv.appendChild(bookAuthor);
      //Add Genre
      const bookGenre = document.createElement('div');
      const bookGenre2 = document.createElement('div');
      bookGenre2.textContent = "Genre";
      bookGenre.className = 'bookGenre';
      bookGenre.textContent = book.genre;
      bookDiv.appendChild(bookGenre2);
      bookDiv.appendChild(bookGenre);
      //Add Read flag
      const bookRead = document.createElement('div');
      bookRead.className = 'bookRead';
      bookRead.textContent = (book.read) ? "Read" : "Unread";
      bookDiv.appendChild(bookRead);

      const empty = document.createElement('div');
      bookDiv.appendChild(empty);
      
      //Add read/unread toggle button      
      const bookToggle = document.createElement('button');
      bookToggle.className = 'bookToggle';
      bookToggle.textContent = (book.read) ? "Unread" : "Read";
      bookDiv.appendChild(bookToggle);
      //Add Trash button      
      const bookTrash = document.createElement('button');
      bookTrash.className = 'bookTrash';
      bookTrash.textContent = "Delete";
      bookDiv.appendChild(bookTrash);

      bookshelf.appendChild(bookDiv);
    });
};


// Create modal with javascript 
const button = document.getElementById('myButton');

function loadAddBookModal() {
    const modal = document.getElementById('modal');
  
    // Create form element
    const form = document.createElement('form');
  
    // Create book name input field
    const bookNameLabel = document.createElement('label');
    bookNameLabel.for = 'bookName';
    bookNameLabel.textContent = 'Book Name:';
    const bookNameInput = document.createElement('input');
    bookNameInput.type = 'text';
    bookNameInput.id = 'bookName';
    bookNameInput.name = 'bookName';
    bookNameInput.setAttribute('required', '');
  
    // Create book author input field
    const bookAuthorLabel = document.createElement('label');
    bookAuthorLabel.for = 'bookAuthor';
    bookAuthorLabel.textContent = 'Book Author:';
    const bookAuthorInput = document.createElement('input');
    bookAuthorInput.type = 'text';
    bookAuthorInput.id = 'bookAuthor';
    bookAuthorInput.name = 'bookAuthor';
    bookAuthorInput.setAttribute('required', '');
  
    // Create book genre dropdown
    const bookGenreLabel = document.createElement('label');
    bookGenreLabel.for = 'bookGenre';
    bookGenreLabel.textContent = 'Book Genre:';
    const bookGenreSelect = document.createElement('select');
    bookGenreSelect.id = 'bookGenre';
    bookGenreSelect.name = 'bookGenre';
    const fictionOption = document.createElement('option');
    fictionOption.value = 'fiction';
    fictionOption.textContent = 'Fiction';
    bookGenreSelect.appendChild(fictionOption);
    const nonFictionOption = document.createElement('option');
    nonFictionOption.value = 'non-fiction';
    nonFictionOption.textContent = 'Non-Fiction';
    bookGenreSelect.appendChild(nonFictionOption);
    bookGenreSelect.setAttribute('required', '');
  
    // Create book read checkbox
    const bookReadLabel = document.createElement('label');
    bookReadLabel.for = 'bookRead';
    bookReadLabel.textContent = 'Book Read:';
    const bookReadInput = document.createElement('input');
    bookReadInput.type = 'checkbox';
    bookReadInput.id = 'bookRead';
    bookReadInput.name = 'bookRead';
  
    // Create add book button
    const addBookBtn = document.createElement('button');
    addBookBtn.className = 'addBookBtn';
    addBookBtn.textContent = 'Add Book';

    
    // Create span
    const addMessage = document.createElement('span');
    addMessage.id = 'bookSpan';
    addMessage.textContent = '';

    // Create a close button
    const closeModalBtn = document.createElement('button');
    closeModalBtn.className = 'close';
    closeModalBtn.textContent = 'X';
    modal.appendChild(closeModalBtn);

    // Append form elements to modal
    modal.appendChild(form);
    form.appendChild(bookNameLabel);
    form.appendChild(bookNameInput);
    form.appendChild(bookAuthorLabel);
    form.appendChild(bookAuthorInput);
    form.appendChild(bookGenreLabel);
    form.appendChild(bookGenreSelect);
    form.appendChild(bookReadLabel);
    form.appendChild(bookReadInput);
    form.appendChild(addBookBtn);
    form.appendChild(addMessage);
  
    // Add event listener to add book button
    addBookBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (form.checkValidity()) {
             addBook();
            document.getElementById('bookSpan').textContent = "";
        } else {
            document.getElementById('bookSpan').textContent = "Please complete the form";
        }
      });

    
    closeModalBtn.addEventListener('click', (event) => {
        event.preventDefault();
        toggleModal();
      });
  }
  
  function addBook() {
    const bookName = document.getElementById('bookName').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookGenre = document.getElementById('bookGenre').value;
    const bookRead = document.getElementById('bookRead').checked;

    // Add book to database
    let newBook = new Book(bookName, bookAuthor, bookGenre, bookRead);
    newBook.add();

    addToggle();
    addTrash();

    //Clear form
    document.getElementById('bookName').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookGenre').value = '';
    document.getElementById('bookRead').checked = false;    
    
  }

  function toggleModal() {
    const modal = document.getElementById('modal');
    modal.classList.toggle('active');
  }

// Call function to make the modal
loadAddBookModal();

// Make modal appear or disappear
const toggleModalBtn = document.getElementById('toggleModalBtn');
toggleModalBtn.addEventListener('click', (event) => {
    event.preventDefault();
    toggleModal();
  });

  
// Add event listener to Book toggle
function addToggle() {
const toggleButtons = document.querySelectorAll('.bookToggle');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.parentNode.getElementsByClassName('bookRead')[0].textContent == 'Unread') {
            button.parentNode.getElementsByClassName('bookRead')[0].textContent = "Read";
            button.parentNode.getElementsByClassName('bookToggle')[0].textContent = "Unread";
            library.find(book => book.name == button.parentNode.getElementsByClassName('bookTitle')[0].textContent).read = true;
        } else {
            button.parentNode.getElementsByClassName('bookRead')[0].textContent = "Unread";
            button.parentNode.getElementsByClassName('bookToggle')[0].textContent = "Read";
            library.find(book => book.name == button.parentNode.getElementsByClassName('bookTitle')[0].textContent).read = false;
        }
});
});
}

// Add event listener to Book trash
function addTrash() {
const trashButtons = document.querySelectorAll('.bookTrash');
trashButtons.forEach(button => {
    button.addEventListener('click', () => {        
        const newLibrary = library.filter(book => book.name !== button.parentNode.getElementsByClassName('bookTitle')[0].textContent);
        button.parentNode.remove();
        library = newLibrary;
        });
});
    

};

