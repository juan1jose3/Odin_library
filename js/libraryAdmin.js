const myLibrary = [];


function Book(id,title, author, pages, readStatus) {
  // the constructor...
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.bookInfo = function () {
  return `${this.title} ${this.author} ${this.pages} ${this.readStatus}`;
};


function addBookToLibrary(title, author, pages, readStatus) {
  // take params, create a book then store it in the array
  const id = crypto.randomUUID();
  //console.log(id);
  let bookItem = new Book(id, title, author, pages,readStatus);
  //console.log(bookItem.bookInfo());

  myLibrary.push(bookItem);
  
}

function displayLibrary(){
  const bookCollection = document.querySelector(".book-collection");

  let lastItem = myLibrary[myLibrary.length - 1];
 
  
  // I need to modify this section to make it more secure and avoid Cross-Site Scripting (XSS).
  
  var card = `
    <div class="book-card">
        <div class="title-wrapper">
            <div class="hidden-id">${lastItem.id}</div>
            <h3>${lastItem.title}</h3>
            <div class="book-info">
                <p>${lastItem.author}</p>
                <div class="book-cover-container">
                    <img src="../assets/book-placeholder.png" alt="" class="book-cover">
                </div>
                <p>Pages: ${lastItem.pages}</p>
                  
                <div class="button-section"> 
                    <button class="${lastItem.readStatus}-button">${lastItem.readStatus}</button>
                    <button class="remove-button">Remove</button>
                </div>
            </div>
        </div>
    </div>
  `;  
  bookCollection.insertAdjacentHTML('beforeend', card);
  
}

function fetchFormData() {
  const modalForm = document.querySelector("form");

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const bookTitle = data.get("bookTitle");
    const bookAuthor = data.get("bookAuthor");
    const bookPages = data.get("bookPages");
    const readStatus = data.get("readStatus");
    

    addBookToLibrary(bookTitle, bookAuthor, bookPages, readStatus);
    displayLibrary();
    
  });
}

fetchFormData();




