var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const booksEl = document.querySelectorAll(".book");
const apiUrl = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
let books = [];
const BookCoverEl = document.getElementById("bookCover");
const infoBoxAboutEl = document.getElementById("bookInfo");
const smallAbouts = document.getElementById("bookSmallAbouts");
const infoBoxEl = document.querySelector(".book-container");
const exitBookInfo = document.getElementById("exit");
//add events on exitbutton
exitBookInfo.addEventListener("click", () => {
    infoBoxEl.classList.remove("chosen-book");
    clearSearch(listContainer);
});
const searchButtonEl = document.getElementById("searchButton");
searchButtonEl === null || searchButtonEl === void 0 ? void 0 : searchButtonEl.addEventListener("click", () => {
    searchBook();
});
let listContainer = document.createElement("div");
//
// fetch with apiUrl and saves the response as interface book and calls on the addbooks function
const fetchBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(apiUrl);
    const bookResponse = yield response.json();
    books = bookResponse;
    addBooks(books);
});
fetchBooks();
//adds title and author on the books on the shelf
const addBooks = (books) => {
    booksEl.forEach((bookEl, i) => {
        const bookTitle = document.createElement("h2");
        bookTitle.innerText = books[i].title;
        bookTitle.classList.add("book-title");
        const bookAuthor = document.createElement("p");
        bookAuthor.innerText = books[i].author;
        bookAuthor.classList.add("book-author");
        bookEl.appendChild(bookTitle);
        bookEl.appendChild(bookAuthor);
        bookEl.addEventListener("click", () => {
            //first we remove all the children if there's any
            clearChildren();
            //function that shows and creates the infobox about the book
            createAboutBook(books, i);
        });
    });
};
const createAboutBook = (books, i) => {
    var _a;
    infoBoxEl.classList.add("chosen-book");
    //creates the front cover of the book
    const bookTitle = document.createElement("h2");
    bookTitle.innerText = books[i].title;
    bookTitle.classList.add("book-title");
    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = books[i].author;
    BookCoverEl.appendChild(bookTitle);
    BookCoverEl.appendChild(bookAuthor);
    // creates the info-pages
    const aboutTitle = document.createElement("h1");
    aboutTitle.classList.add("book-cover-title");
    aboutTitle.innerText = books[i].title;
    const aboutAuthor = document.createElement("h2");
    aboutAuthor.classList.add("book-cover-author");
    aboutAuthor.innerText = `by ${books[i].author}`;
    aboutAuthor.classList.add("about-author");
    infoBoxAboutEl.appendChild(aboutTitle);
    infoBoxAboutEl.appendChild(aboutAuthor);
    // about
    const aboutBook = document.createElement("p");
    aboutBook.innerText = books[i].plot;
    infoBoxAboutEl.appendChild(aboutBook);
    const smallAboutsInfo = document.createElement("p");
    smallAboutsInfo.innerText = `Audience: ${books[i].audience} 
 Pages: ${(_a = books[i].pages) !== null && _a !== void 0 ? _a : ` `}
 First Published: ${books[i].year} 
 `;
    smallAbouts.appendChild(smallAboutsInfo);
};
const clearChildren = () => {
    BookCoverEl === null || BookCoverEl === void 0 ? void 0 : BookCoverEl.replaceChildren();
    infoBoxAboutEl === null || infoBoxAboutEl === void 0 ? void 0 : infoBoxAboutEl.replaceChildren();
    smallAbouts === null || smallAbouts === void 0 ? void 0 : smallAbouts.replaceChildren();
};
//takes input and saves to a variable
const searchBook = () => {
    const searchBookRes = (document.getElementById("inputSearchBox")).value.toLocaleLowerCase();
    //filter the books that icludes the search value
    const bookSearch = books.filter((book) => book.title.toLocaleLowerCase().includes(searchBookRes));
    console.log(bookSearch);
    createSearchList(bookSearch);
};
// creates a list that you can chose a book from
const createSearchList = (bookSearch) => {
    const searchContainer = document.querySelector(".search-container");
    // const listContainer: HTMLElement = document.createElement("div");
    searchContainer.appendChild(listContainer);
    bookSearch.forEach((book) => {
        const bookListItem = document.createElement("p");
        bookListItem.innerText = book.title;
        listContainer.appendChild(bookListItem);
        bookListItem.addEventListener("click", () => {
            clearSearch(listContainer);
            clearChildren();
            createAboutBook(books, book.id - 1);
        });
    });
    return listContainer;
};
const clearSearch = (listContainer) => {
    listContainer.remove();
    listContainer = document.createElement("div");
    const searchBookEl = (document.getElementById("inputSearchBox"));
    searchBookEl.value = "";
};
export {};
