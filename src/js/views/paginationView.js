import View from "./view";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');
    
    _generateMarkup() {
        const currentPage = this._data.currentPage;
  
        const numPages = Math.ceil(this._data.result.length / this._data.post_per_page);


    //  NOTE: 1) pagination for first page 
        if(currentPage===1 && currentPage< numPages){
            return `
          <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }

    //  NOTE: 2) pagination for middle page
        if (currentPage > 1 && currentPage < numPages) {
            return `<button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>
          <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }

    //  NOTE: 3) pagination for last page 
        if ( currentPage === numPages) {
            return `<button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>`;
        }

    //4) pagination when only one page
        return '';
    }

    addHandlerPagination(handle){
        this._parentElement.addEventListener('click',function(e){
            e.preventDefault();
            const btn = e.target.closest('button');
            if(!btn) return ;
            const goTo = +btn.dataset.goto;
            handle(goTo);

        });
    }

}

export default new PaginationView();