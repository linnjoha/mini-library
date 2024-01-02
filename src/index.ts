//if null ???
//
import { book } from "./interface";
const booksEl: NodeListOf<Element> = document.querySelectorAll(".book");
const apiUrl: string =
  "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
let books: book[] = [];
const BookCoverEl: HTMLElement | null = document.getElementById("bookCover");
const infoBoxAboutEl: HTMLElement | null = document.getElementById("bookInfo");
const smallAbouts: HTMLElement | null =
  document.getElementById("bookSmallAbouts");
const infoBoxEl = document.querySelector(".book-container");
const exitBookInfo = document.getElementById("exit");
exitBookInfo?.addEventListener("click", () => {
  infoBoxEl?.classList.remove("chosen-book");
});
//
// fetch with apiUrl and saves the response as interface book
const fetchBooks = async () => {
  const response: Response = await fetch(apiUrl);
  const bookResponse: book[] = await response.json();
  books = bookResponse;
  addBooks(books);
};
fetchBooks();

const addBooks = (books: book[]) => {
  booksEl.forEach((bookEl, i) => {
    const bookTitle: HTMLElement = document.createElement("h2");
    bookTitle.innerText = books[i].title;
    bookTitle.classList.add("book-title");
    const bookAuthor: HTMLElement = document.createElement("p");
    bookAuthor.innerText = books[i].author;
    bookAuthor.classList.add("book-author");
    bookEl.appendChild(bookTitle);
    bookEl.appendChild(bookAuthor);
    bookEl.addEventListener("click", () => {
      infoBoxEl?.classList.add("chosen-book");
      //first we remove all the children if there's any
      clearChildren();
      //function that shows and creates the infobox about the book
      createAboutBook(books, i);
    });
  });
};
const createAboutBook = (books: book[], i: number) => {
  //creates the front of the book
  const bookTitle: HTMLElement = document.createElement("h2");
  bookTitle.innerText = books[i].title;
  bookTitle.classList.add("book-title");
  const bookAuthor: HTMLElement = document.createElement("p");
  bookAuthor.innerText = books[i].author;
  BookCoverEl?.appendChild(bookTitle);
  BookCoverEl?.appendChild(bookAuthor);
  // creates the info-pages
  const aboutTitle: HTMLElement = document.createElement("h1");
  aboutTitle.classList.add("book-cover-title");
  aboutTitle.innerText = books[i].title;
  const aboutAuthor: HTMLElement = document.createElement("h2");
  aboutAuthor.classList.add("book-cover-author");
  aboutAuthor.innerText = `by ${books[i].author}`;
  aboutAuthor.classList.add("about-author");
  infoBoxAboutEl?.appendChild(aboutTitle);
  infoBoxAboutEl?.appendChild(aboutAuthor);
  // about
  const aboutBook: HTMLElement = document.createElement("p");
  aboutBook.innerText = books[i].plot;
  infoBoxAboutEl?.appendChild(aboutBook);
  const smallAboutsInfo: HTMLElement = document.createElement("p");
  smallAboutsInfo.innerText = `Audience: ${books[i].audience} 
 Pages: ${books[i].pages}
 First Published: ${books[i].year} 
 `;
  smallAbouts?.appendChild(smallAboutsInfo);
};

const clearChildren = () => {
  BookCoverEl?.replaceChildren();
  infoBoxAboutEl?.replaceChildren();
  smallAbouts?.replaceChildren();
};
