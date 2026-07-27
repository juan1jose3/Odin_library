const myLibrary = [];

function Book(id,title, author, pages) {
  // the constructor...
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
}

Book.prototype.bookInfo = function () {
  return `${this.title} ${this.author} ${this.pages}`;
};


function addBookToLibrary(title, author, pages) {
  // take params, create a book then store it in the array
  const id = crypto.randomUUID();
  //console.log(id);
  let bookItem = new Book(id, title, author, pages);
  //console.log(bookItem.bookInfo());

  myLibrary.push(bookItem);
  console.log(myLibrary);
  
}

function fetchFormData() {
  const modalForm = document.querySelector("form");

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const bookTitle = data.get("bookTitle");
    const bookAuthor = data.get("bookAuthor");
    const bookPages = data.get("bookPages");

    addBookToLibrary(bookTitle, bookAuthor, bookPages);
    
  });
}

fetchFormData();




