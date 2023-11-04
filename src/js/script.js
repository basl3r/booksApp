{
  'use strict';

  const template = {
    book: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const favoriteBooks = [];

  function renderBooks() {
    console.log(dataSource.books);

    for (let book of dataSource.books) {
      const generatedHTML = template.book(book);
      console.log(generatedHTML);

      const element = utils.createDOMFromHTML(generatedHTML);
      console.log(element);

      const bookContainer = document.querySelector('.books-list');
      console.log(bookContainer);

      bookContainer.appendChild(element);
    } 
  }

  function initActions() {
    const bookImgs = document.querySelectorAll('.book__image');
    console.log(bookImgs);

    for (let singleBook of bookImgs) {
      const singleDataID = singleBook.getAttribute('data-id');
      console.log(singleBook);   
      singleBook.addEventListener('dblclick', function() {
        singleBook.classList.add('favorite');
        favoriteBooks.push(singleDataID);
        console.log(favoriteBooks);
      });
    }

  }


  renderBooks();

  initActions();


}