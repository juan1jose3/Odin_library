const myLibrary = [];
const bookCollection = document.querySelector(".book-collection");


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


function removeBookFromLibrary(bookId) {
  for (let book of myLibrary) {
    if (book.id === bookId) {
      let index = myLibrary.indexOf(book);
      myLibrary.splice(index, 1);
    }
  }
}

function addBookToLibrary(title, author, pages, readStatus) {
  // take params, create a book then store it in the array
  const id = crypto.randomUUID();
  //console.log(id);
  let bookItem = new Book(id, title, author, pages,readStatus);
  //console.log(bookItem.bookInfo());

  myLibrary.push(bookItem);
  
}


function updateReadingStatus(status, bookId) {
  for (let book of myLibrary) {
    if (book.id === bookId) {
      book.readStatus = status;
      console.log("Status Updated In Library");
    }
  }

  console.log(myLibrary);
}

function displayLibrary(){

  let lastItem = myLibrary[myLibrary.length - 1];
 
  
  // I need to modify this section to make it more secure and avoid Cross-Site Scripting (XSS).
  
  var card = `
    <div class="book-card">
        <div class="title-wrapper">
            <h3>${lastItem.title}</h3>
            <div class="book-info">
                <p>${lastItem.author}</p>
                <div class="book-cover-container">
                    <img src="../assets/book-placeholder.png" alt="" class="book-cover">
                </div>
                <p>Pages: ${lastItem.pages}</p>
                  
                <div class="button-section"> 
                    <button class="${lastItem.readStatus}-button" bookId="${lastItem.id}">${lastItem.readStatus}</button>
                    <button class="remove-button" bookId="${lastItem.id}">Remove</button>
                </div>
            </div>
        </div>
    </div>
  `;  
  bookCollection.insertAdjacentHTML('beforeend', card);
  
}


function additionalOptions() {
  bookCollection.addEventListener("click", (event) => {
    let button = event.target.closest("button");
    if (!button) return;

    let status;
    let bookId = button.getAttribute("bookID");
    
    
    if (button.className === "remove-button") {
    
      let card = button.closest(".book-card");
      card.remove();
      removeBookFromLibrary(bookId);
      
    } else if (button.className === "not-read-button") {
      
      button.classList.remove("not-read-button");
      button.textContent = "Read";
      button.classList.add("read-button");
    } else {
      
      button.classList.remove("read-button");
      button.textContent = "Not-Read";
      button.classList.add("not-read-button");
    }

    

    status = button.textContent.toLowerCase();
    console.log(bookId);

    updateReadingStatus(status, bookId);
    
  });
}removeBookFromLibrary


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


additionalOptions();
fetchFormData();




