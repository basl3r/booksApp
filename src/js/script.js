{
  'use strict';
  
  const template = {
    book: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.favoriteBooks = []; //array storing ids of favorit books
      thisBooksList.filters = []; //array storing books filtered by genre

      thisBooksList.initData();
      thisBooksList.renderBooks();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    //initData is creating a new property with assigned books details from dataSource.books
    initData() {
      const thisBooksList = this;

      console.log('thisBooksList', thisBooksList);

      thisBooksList.data = dataSource.books;

    } 
    //renderBooks is generating HTML to be inserted into Handlebars template
    renderBooks() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
  
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
  
        const generatedHTML = template.book(book);
        console.log(generatedHTML);
  
        const element = utils.createDOMFromHTML(generatedHTML);
        console.log(element);
  
        const bookContainer = document.querySelector('.books-list');
        console.log(bookContainer);
  
        bookContainer.appendChild(element);
      } 
  
      thisBooksList.determineRatingBgc();
  
    }
    //determineRatingBgc is assesing a book rating and returning color to be inserted to style argument in Handlebars template
    determineRatingBgc(rating) {
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
    //getElements is used to get DOM objects
    getElements() {
      const thisBooksList = this;

      thisBooksList.dom = {};

      thisBooksList.dom.booksList = document.querySelector('.books-list');

      thisBooksList.dom.filtersForm = document.querySelector('.filters');
    }
    //filterBooks is filtering book by their detail and hidding unchecked ones
    filterBooks() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        console.log(book);
  
        let hideBook = false;
  
        for(let filter of thisBooksList.filters){ 
  
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

    initActions() {
      const thisBooksList = this;
      
      const bookImgs = document.querySelectorAll('.book__image');
      console.log(bookImgs);
      
  
      thisBooksList.dom.booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
        console.log(event);
  
        const clickedBook = event.target.closest('a');
        console.log(clickedBook);
  
        const bookId = clickedBook.getAttribute('data-id');
        console.log(bookId);
  
        if (!thisBooksList.favoriteBooks.includes(bookId)) {
          
          clickedBook.classList.add('favorite');
  
          thisBooksList.favoriteBooks.push(bookId);
  
          console.log(thisBooksList.favoriteBooks);
  
        } else {
  
          let indexOf = thisBooksList.favoriteBooks.indexOf(bookId);
  
          thisBooksList.favoriteBooks.splice(indexOf, 1);
  
          clickedBook.classList.remove('favorite');
  
          console.log(thisBooksList.favoriteBooks);
  
        }
  
      });
  
      thisBooksList.dom.filtersForm.addEventListener('click', function(event){
  
        console.log('event.target: ', event.target);
  
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          
          console.log(event.target.value); 
          
          if(event.target.checked){
  
            thisBooksList.filters.push(event.target.value);
  
          } else if(!event.target.checked){ 
  
            thisBooksList.filters.splice((thisBooksList.filters.indexOf(event.target.value)), 1);
  
          }
        }
  
        thisBooksList.filterBooks();
  
      });
    }
  }
  
  const app = new BooksList();
  console.log(app);

}
