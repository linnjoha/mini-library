import { book } from "./interface";
const booksEl: NodeListOf<Element> = document.querySelectorAll(".book");
const apiUrl: string =
  "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
let books: book[] = [];
//global element variables
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
const searchButtonEl: HTMLButtonElement = document.getElementById(
  "searchButton"
) as HTMLButtonElement;
let listContainer: HTMLElement = document.createElement("div");

//eventlisteners
//add eventlistener on exit"button"
exitBookInfo.addEventListener("click", () => {
  infoBoxEl.classList.remove("chosen-book");
  clearSearch(listContainer);
});
//add eventlisteners on the searchbutton
searchButtonEl.addEventListener("click", () => {
  searchBook();
});

//

// fetch with apiUrl and saves the response as interface book and calls on the addbooks function
const fetchBooks = async () => {
  const response: Response = await fetch(apiUrl);
  const bookResponse: book[] = await response.json();
  books = bookResponse;
  addBooks(books);
};
fetchBooks();

//adds title and author on the books on the "shelf"
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
    //when you click on a book on the "shelf"
    bookEl.addEventListener("click", () => {
      //first we remove all the children if there's any
      clearChildren();
      //function that shows and creates the infobox about the book
      createAboutBook(books, i);
    });
  });
};

//adds classlist on the infobox, so it will be visable and creates all the elements on the specific book
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
  // creates the info the elements with, title, author and plot.
  const aboutTitle: HTMLElement = document.createElement("h1");
  aboutTitle.classList.add("book-cover-title");
  aboutTitle.innerText = books[i].title;
  const aboutAuthor: HTMLElement = document.createElement("h2");
  aboutAuthor.classList.add("book-cover-author");
  aboutAuthor.innerText = `by ${books[i].author}`;
  aboutAuthor.classList.add("about-author");
  infoBoxAboutEl.appendChild(aboutTitle);
  infoBoxAboutEl.appendChild(aboutAuthor);
  const aboutBook: HTMLElement = document.createElement("p");
  aboutBook.innerText = books[i].plot;
  infoBoxAboutEl.appendChild(aboutBook);
  // creates the small info
  const smallAboutsInfo: HTMLElement = document.createElement("p");
  smallAboutsInfo.innerText = `Audience: ${books[i].audience} 
 Pages: ${books[i].pages ?? ` `}
 First Published: ${books[i].year} 
 `;
  smallAbouts.appendChild(smallAboutsInfo);
};

const clearChildren = () => {
  BookCoverEl.replaceChildren();
  infoBoxAboutEl.replaceChildren();
  smallAbouts.replaceChildren();
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
  if (searchBookRes.length > 0) {
    createSearchList(bookSearch);
  }
};

// creates a "list" with titles from the filtered book array that you can chose from
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
    //adds a click event on the title
    bookListItem.addEventListener("click", () => {
      clearSearch(listContainer);
      clearChildren();
      createAboutBook(books, book.id - 1);
    });
  });
  return listContainer;
};
// clears out the sears area and reset the placeholder
const clearSearch = (listContainer: HTMLElement) => {
  listContainer.remove();
  listContainer = document.createElement("div");
  const searchBookEl = <HTMLInputElement>(
    document.getElementById("inputSearchBox")
  );
  searchBookEl.value = "";
};
