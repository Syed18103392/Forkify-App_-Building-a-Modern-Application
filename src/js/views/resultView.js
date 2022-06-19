import View from "./view.js";
import icons from 'url:../../img/icons.svg';
import PreviewView from "./PreviewView.js";

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No result found . Try another one .';
    _message = 'Successful';

    _generateMarkup() {
      // console.log(this._data);
      return this._data.map(result => PreviewView.render(result,false)).join('');
    }

}

export default new ResultView();