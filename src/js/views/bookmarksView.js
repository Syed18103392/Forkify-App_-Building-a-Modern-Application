import View from "./view.js";
import icons from 'url:../../img/icons.svg';
import PreviewView from "./PreviewView.js";

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
    _message = 'Successful';
    
    _generateMarkup() {
        return this._data.map(result=> PreviewView.render(result,false)).join('');
    }

    addHandler(handle){
        window.addEventListener('load',handle);
    }
}

export default new BookmarksView();