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
            createAboutBook(books, i);
        });
    });
};
const createAboutBook = (books, i) => {
    //creates the front of the book
    const infoBoxEl = document.querySelector(".book-container");
    infoBoxEl === null || infoBoxEl === void 0 ? void 0 : infoBoxEl.classList.add("chosen-book");
    const BookCoverEl = document.getElementById("bookCover");
    const bookTitle = document.createElement("h2");
    bookTitle.innerText = books[i].title;
    bookTitle.classList.add("book-title");
    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = books[i].author;
    BookCoverEl === null || BookCoverEl === void 0 ? void 0 : BookCoverEl.appendChild(bookTitle);
    BookCoverEl === null || BookCoverEl === void 0 ? void 0 : BookCoverEl.appendChild(bookAuthor);
    // creates the info-pages
    const infoBoxAboutEl = document.getElementById("bookInfo");
    const aboutTitle = document.createElement("h1");
    aboutTitle.classList.add("book-cover-title");
    aboutTitle.innerText = books[i].title;
    const aboutAuthor = document.createElement("h2");
    aboutAuthor.classList.add("book-cover-author");
    aboutAuthor.innerText = `by ${books[i].author}`;
    infoBoxAboutEl === null || infoBoxAboutEl === void 0 ? void 0 : infoBoxAboutEl.appendChild(aboutTitle);
    infoBoxAboutEl === null || infoBoxAboutEl === void 0 ? void 0 : infoBoxAboutEl.appendChild(aboutAuthor);
    // about
    const aboutBook = document.createElement("p");
    aboutBook.innerText = books[i].plot;
    infoBoxAboutEl === null || infoBoxAboutEl === void 0 ? void 0 : infoBoxAboutEl.appendChild(aboutBook);
    const smallAbouts = document.getElementById("bookSmallAbouts");
    const smallAboutsInfo = document.createElement("p");
    smallAboutsInfo.innerText = `Audience: ${books[i].audience} 
 Pages:${books[i].pages}
 First Puplished : ${books[i].year} 
 `;
    smallAbouts === null || smallAbouts === void 0 ? void 0 : smallAbouts.appendChild(smallAboutsInfo);
};
export {};
