{
  'use strict';

  const template = {
    book: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };


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

  renderBooks();
}