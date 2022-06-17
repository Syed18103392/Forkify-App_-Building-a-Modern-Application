import View from "./view.js";
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No result found . Try another one .';
    _message = 'Successful';

    _generateMarkup(){
        const markup = this._data.map(recipe=>{
        return `<li class="preview">
            <a class="preview__link " href="#${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p> 
              </div>
            </a>
          </li>`
        });
        const finalMarkup = markup.join('');
        return finalMarkup;
    }

}

export default new ResultView();