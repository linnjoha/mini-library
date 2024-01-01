//
import { book } from "./interface";
const booksEl: NodeListOf<Element> = document.querySelectorAll(".book");
const apiUrl: string =
  "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
let books: book[] = [];

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
      createAboutBook(books, i);
    });
  });
};
const createAboutBook = (books: book[], i: number) => {
  //creates the front of the book
  const infoBoxEl = document.querySelector(".book-container");
  infoBoxEl?.classList.add("chosen-book");
  const BookCoverEl: Element | null = document.getElementById("bookCover");
  const bookTitle: HTMLElement = document.createElement("h2");
  bookTitle.innerText = books[i].title;
  bookTitle.classList.add("book-title");
  const bookAuthor: HTMLElement = document.createElement("p");
  bookAuthor.innerText = books[i].author;
  BookCoverEl?.appendChild(bookTitle);
  BookCoverEl?.appendChild(bookAuthor);
  // creates the info-pages
  const infoBoxAboutEl: Element | null = document.getElementById("bookInfo");
  const aboutTitle: HTMLElement = document.createElement("h1");
  aboutTitle.classList.add("book-cover-title");
  aboutTitle.innerText = books[i].title;
  const aboutAuthor: HTMLElement = document.createElement("h2");
  aboutAuthor.classList.add("book-cover-author");
  aboutAuthor.innerText = `by ${books[i].author}`;
  infoBoxAboutEl?.appendChild(aboutTitle);
  infoBoxAboutEl?.appendChild(aboutAuthor);
  // about
  const aboutBook: HTMLElement = document.createElement("p");
  aboutBook.innerText = books[i].plot;
  infoBoxAboutEl?.appendChild(aboutBook);
  const smallAbouts: HTMLElement | null =
    document.getElementById("bookSmallAbouts");
  const smallAboutsInfo: HTMLElement = document.createElement("p");
  smallAboutsInfo.innerText = `Audience: ${books[i].audience} 
 Pages:${books[i].pages}
 First Puplished : ${books[i].year} 
 `;
  smallAbouts?.appendChild(smallAboutsInfo);
};
