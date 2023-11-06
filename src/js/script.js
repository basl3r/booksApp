{
  'use strict';

  const template = {
    book: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const booksList = document.querySelector('.books-list');
  console.log(booksList);
  
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
    

    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      console.log(event);

      const clickedBook = event.target.closest('a');
      console.log(clickedBook);

      const bookId = clickedBook.getAttribute('data-id');
      console.log(bookId);

      if (!favoriteBooks.includes(bookId)) {
        
        clickedBook.classList.add('favorite');

        favoriteBooks.push(bookId);

        console.log(favoriteBooks);

      } else {

        let indexOf = favoriteBooks.indexOf(bookId);

        favoriteBooks.splice(indexOf, 1);

        clickedBook.classList.remove('favorite');

        console.log(favoriteBooks);
        
      }

    });

    /* for (let singleBook of bookImgs) {

      const bookId = singleBook.getAttribute('data-id');
      console.log(singleBook);   

      singleBook.addEventListener('dblclick', function() {

        if (singleBook.className !== 'book__image favorite') {

          console.log(singleBook.className);

          singleBook.classList.add('favorite');

          favoriteBooks.push(bookId);

          console.log(favoriteBooks);

        } else {

          let indexOf = favoriteBooks.indexOf(bookId);

          singleBook.classList.remove('favorite');

          favoriteBooks.splice(indexOf, 1);

        }

      }); */
  }

  renderBooks();

  initActions();

}