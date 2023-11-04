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

      const singleBookDataId = singleBook.getAttribute('data-id');
      console.log(singleBook);   

      singleBook.addEventListener('dblclick', function() {

        if (singleBook.className !== 'book__image favorite') {

          console.log(singleBook.className);

          singleBook.classList.add('favorite');

          favoriteBooks.push(singleBookDataId);

          console.log(favoriteBooks);
        } else {

          let indexOf = favoriteBooks.indexOf(singleBookDataId);

          singleBook.classList.remove('favorite');

          favoriteBooks.splice(indexOf, 1);

        }

      });
    }

  }


  renderBooks();

  initActions();


}