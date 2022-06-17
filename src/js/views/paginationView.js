import View from "./view";
class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');
    
    _generateMarkup() {
        console.log('calling');
        const currentPage = this._data.currentPage;
        // console.log(this._data.result.length);
        const numPages = Math.ceil(this._data.result.length / this._data.post_per_page);
        console.log(numPages);
    // 1) pagination for first page 
        if(currentPage===1 && currentPage< numPages){
            return 'first page';
        }
    // 2) pagination for middle page
        if (currentPage > 1 && currentPage < numPages) {
            return 'middle page';
        }

    // 3) pagination for last page 
        if ( currentPage === numPages) {
            return 'last page';
        }

    //4) pagination when only one page
        return 'only one page';
    }

}

export default new PaginationView();