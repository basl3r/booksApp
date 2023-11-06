{
  'use strict';

  const template = {
    book: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const booksList = document.querySelector('.books-list');
  console.log(booksList);

  const filtersForm = document.querySelector('.filters');
  console.log('filtersForm: ', filtersForm);
  
  const favoriteBooks = [];

  const filters = [];


  function renderBooks() {
    console.log(dataSource.books);

    for (let book of dataSource.books) {

      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      const generatedHTML = template.book(book);
      console.log(generatedHTML);

      const element = utils.createDOMFromHTML(generatedHTML);
      console.log(element);

      const bookContainer = document.querySelector('.books-list');
      console.log(bookContainer);

      bookContainer.appendChild(element);
    } 

    determineRatingBgc();

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

    filtersForm.addEventListener('click', function(event){

      console.log('event.target: ', event.target);

      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        
        console.log(event.target.value); 
        
        if(event.target.checked){

          filters.push(event.target.value);

        } else if(!event.target.checked){ 

          filters.splice((filters.indexOf(event.target.value)), 1);

        }
      }

      filterBooks();

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

  function filterBooks() {

    for (let book of dataSource.books) {
      console.log(book);

      let hideBook = false;

      for(let filter of filters){ 

        if(!book.details[filter]){

          hideBook = true;
          
          break;
        }
      }

      const filteredBooks = document.querySelector('.book__image[data-id="' + book.id + '"]'); 

      if(hideBook){

        filteredBooks.classList.add('hidden');

      } else if(!hideBook){

        filteredBooks.classList.remove('hidden');

      }
    }
  }

  function determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }

  renderBooks();

  initActions();

}