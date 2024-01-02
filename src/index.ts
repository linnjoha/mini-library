import { book } from "./interface";
const booksEl: NodeListOf<Element> = document.querySelectorAll(".book");
const apiUrl: string =
  "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
let books: book[] = [];

const BookCoverEl: HTMLElement = document.getElementById(
  "bookCover"
) as HTMLElement;
const infoBoxAboutEl: HTMLElement = document.getElementById(
  "bookInfo"
) as HTMLElement;
const smallAbouts: HTMLElement = document.getElementById(
  "bookSmallAbouts"
) as HTMLElement;
const infoBoxEl: HTMLElement = document.querySelector(
  ".book-container"
) as HTMLElement;
const exitBookInfo: HTMLElement = document.getElementById(
  "exit"
) as HTMLElement;

//add events on exitbutton
exitBookInfo.addEventListener("click", () => {
  infoBoxEl.classList.remove("chosen-book");
  clearSearch(listContainer);
});
const searchButtonEl: HTMLButtonElement = document.getElementById(
  "searchButton"
) as HTMLButtonElement;
searchButtonEl?.addEventListener("click", () => {
  searchBook();
});
let listContainer: HTMLElement = document.createElement("div");
//

// fetch with apiUrl and saves the response as interface book and calls on the addbooks function
const fetchBooks = async () => {
  const response: Response = await fetch(apiUrl);
  const bookResponse: book[] = await response.json();
  books = bookResponse;
  addBooks(books);
};
fetchBooks();

//adds title and author on the books on the shelf
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
      //first we remove all the children if there's any
      clearChildren();
      //function that shows and creates the infobox about the book
      createAboutBook(books, i);
    });
  });
};
const createAboutBook = (books: book[], i: number) => {
  infoBoxEl.classList.add("chosen-book");
  //creates the front cover of the book
  const bookTitle: HTMLElement = document.createElement("h2");
  bookTitle.innerText = books[i].title;
  bookTitle.classList.add("book-title");
  const bookAuthor: HTMLElement = document.createElement("p");
  bookAuthor.innerText = books[i].author;
  BookCoverEl.appendChild(bookTitle);
  BookCoverEl.appendChild(bookAuthor);
  // creates the info-pages
  const aboutTitle: HTMLElement = document.createElement("h1");
  aboutTitle.classList.add("book-cover-title");
  aboutTitle.innerText = books[i].title;
  const aboutAuthor: HTMLElement = document.createElement("h2");
  aboutAuthor.classList.add("book-cover-author");
  aboutAuthor.innerText = `by ${books[i].author}`;
  aboutAuthor.classList.add("about-author");
  infoBoxAboutEl.appendChild(aboutTitle);
  infoBoxAboutEl.appendChild(aboutAuthor);
  // about
  const aboutBook: HTMLElement = document.createElement("p");
  aboutBook.innerText = books[i].plot;
  infoBoxAboutEl.appendChild(aboutBook);
  const smallAboutsInfo: HTMLElement = document.createElement("p");
  smallAboutsInfo.innerText = `Audience: ${books[i].audience} 
 Pages: ${books[i].pages ?? ` `}
 First Published: ${books[i].year} 
 `;
  smallAbouts.appendChild(smallAboutsInfo);
};

const clearChildren = () => {
  BookCoverEl?.replaceChildren();
  infoBoxAboutEl?.replaceChildren();
  smallAbouts?.replaceChildren();
};

//takes input and saves to a variable
const searchBook = () => {
  const searchBookRes: string = (<HTMLInputElement>(
    document.getElementById("inputSearchBox")
  )).value.toLocaleLowerCase();
  //filter the books that icludes the search value
  const bookSearch: book[] = books.filter((book) =>
    book.title.toLocaleLowerCase().includes(searchBookRes)
  );
  console.log(bookSearch);
  createSearchList(bookSearch);
};

// creates a list that you can chose a book from
const createSearchList = (bookSearch: book[]): HTMLElement => {
  const searchContainer: HTMLElement = document.querySelector(
    ".search-container"
  ) as HTMLElement;
  // const listContainer: HTMLElement = document.createElement("div");
  searchContainer.appendChild(listContainer);
  bookSearch.forEach((book) => {
    const bookListItem: HTMLElement = document.createElement("p");
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

const clearSearch = (listContainer: HTMLElement) => {
  listContainer.remove();
  listContainer = document.createElement("div");
  const searchBookEl = <HTMLInputElement>(
    document.getElementById("inputSearchBox")
  );
  searchBookEl.value = "";
};
