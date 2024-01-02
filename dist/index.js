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
exitBookInfo === null || exitBookInfo === void 0 ? void 0 : exitBookInfo.addEventListener("click", () => {
    infoBoxEl === null || infoBoxEl === void 0 ? void 0 : infoBoxEl.classList.remove("chosen-book");
});
//
// fetch with apiUrl and saves the response as interface book
const fetchBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(apiUrl);
    const bookResponse = yield response.json();
    books = bookResponse;
    addBooks(books);
});
fetchBooks();
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
            infoBoxEl === null || infoBoxEl === void 0 ? void 0 : infoBoxEl.classList.add("chosen-book");
            //first we remove all the children if there's any
            clearChildren();
            //function that shows and creates the infobox about the book
            createAboutBook(books, i);
        });
    });
};
const createAboutBook = (books, i) => {
    //creates the front of the book
    const bookTitle = document.createElement("h2");
    bookTitle.innerText = books[i].title;
    bookTitle.classList.add("book-title");
    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = books[i].author;
    BookCoverEl === null || BookCoverEl === void 0 ? void 0 : BookCoverEl.appendChild(bookTitle);
    BookCoverEl === null || BookCoverEl === void 0 ? void 0 : BookCoverEl.appendChild(bookAuthor);
    // creates the info-pages
    const aboutTitle = document.createElement("h1");
    aboutTitle.classList.add("book-cover-title");
    aboutTitle.innerText = books[i].title;
    const aboutAuthor = document.createElement("h2");
    aboutAuthor.classList.add("book-cover-author");
    aboutAuthor.innerText = `by ${books[i].author}`;
    aboutAuthor.classList.add("about-author");
    infoBoxAboutEl === null || infoBoxAboutEl === void 0 ? void 0 : infoBoxAboutEl.appendChild(aboutTitle);
    infoBoxAboutEl === null || infoBoxAboutEl === void 0 ? void 0 : infoBoxAboutEl.appendChild(aboutAuthor);
    // about
    const aboutBook = document.createElement("p");
    aboutBook.innerText = books[i].plot;
    infoBoxAboutEl === null || infoBoxAboutEl === void 0 ? void 0 : infoBoxAboutEl.appendChild(aboutBook);
    const smallAboutsInfo = document.createElement("p");
    smallAboutsInfo.innerText = `Audience: ${books[i].audience} 
 Pages: ${books[i].pages}
 First Published: ${books[i].year} 
 `;
    smallAbouts === null || smallAbouts === void 0 ? void 0 : smallAbouts.appendChild(smallAboutsInfo);
};
const clearChildren = () => {
    BookCoverEl === null || BookCoverEl === void 0 ? void 0 : BookCoverEl.replaceChildren();
    infoBoxAboutEl === null || infoBoxAboutEl === void 0 ? void 0 : infoBoxAboutEl.replaceChildren();
    smallAbouts === null || smallAbouts === void 0 ? void 0 : smallAbouts.replaceChildren();
};
export {};
