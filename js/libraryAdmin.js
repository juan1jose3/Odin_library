
const myLibrary = [];
const bookCollection = document.querySelector(".book-collection");


function Book(id,title, author, pages, readStatus, bookCover) {
  
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.bookCover = bookCover;
}



function makeCard(id, title, author, pages, readStatus, bookCover) {
  let cover = bookCover;
  if (!bookCover) {
    cover = "/assets/book-placeholder.png" 
  }

  
  let card = `
    <div class="book-card">
        <div class="title-wrapper">
            <h3>${DOMPurify.sanitize(title)}</h3>
            <div class="book-info">
                <p>${DOMPurify.sanitize(author)}</p>
                <div class="book-cover-container">
                    <img src="${DOMPurify.sanitize(cover)}" alt="" class="book-cover">
                </div>
                <p>Pages: ${DOMPurify.sanitize(pages)}</p>
                  
                <div class="button-section"> 
                    <button class="${readStatus}-button" bookId="${id}">${readStatus}</button>
                    <button class="remove-button" bookId="${id}">Remove</button>
                </div>
            </div>
        </div>
    </div>
  `;
  bookCollection.insertAdjacentHTML('beforeend', card);
}

function displayLibrary() {
  bookCollection.replaceChildren();
  for (let book of myLibrary) {
  
    makeCard(book.id, book.title, book.author, book.pages, book.readStatus, book.bookCover);
  }
}


function removeBookFromLibrary(bookId) {
  let index = myLibrary.findIndex(book => book.id === bookId);
  myLibrary.splice(index, 1);
}

function addBookToLibrary(title, author, pages, readStatus, bookCover) {
  const id = crypto.randomUUID();
  let bookItem = new Book(id, title, author, pages,readStatus,bookCover);
  myLibrary.push(bookItem);
  
}


function updateReadingStatus(bookId) {
  
  const object = myLibrary.find(book => book.id === bookId);

  if (object.readStatus === "not-read") {
    object.readStatus = "read";
  } else {
    object.readStatus = "not-read";
  }
  console.log(object.readStatus)
}


function additionalOptions() {
  bookCollection.addEventListener("click", (event) => {

    let button = event.target.closest("button");
    if (!button) return;

    let bookId = button.getAttribute("bookId");
    
    if (button.className === "remove-button") {
      removeBookFromLibrary(bookId);
      
    }else {
      updateReadingStatus(bookId);
    }

    displayLibrary();
  });
}





function fetchFormData() {
  const modalForm = document.querySelector("form");
  const file = document.querySelector("input[type='file']");

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const bookTitle = data.get("bookTitle");
    const bookAuthor = data.get("bookAuthor");
    const bookPages = data.get("bookPages");
    const readStatus = data.get("readStatus");
    let bookCover = data.get("bookCoverImg");

    if (bookTitle === "" ||
      bookAuthor === "" ||
      bookPages === "" ||
      readStatus === ""
    ) {
      alert("Some Data Is Missing");
      return;
    }
    
    
    
    if (bookCover.size === 0) {
      bookCover = undefined;
    }
    else {
      bookCover = URL.createObjectURL(bookCover);
    }

    file.value = "";

    addBookToLibrary(bookTitle, bookAuthor, bookPages, readStatus, bookCover);
    
    displayLibrary();
    
  });
}


addBookToLibrary("The Dunwich Horror", "H.P Lovecraft", 128, "not-read", "/assets/dunwich.jpg");

addBookToLibrary("The Call Of Cthulhu", "H.P Lovecraft", 60, "read", "/assets/the_call.jpg");

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 600, "read", "/assets/the_hobbit.jpg");


displayLibrary();
additionalOptions();
fetchFormData();




