import icons from 'url:../../img/icons.svg';


export default class View{
    _data;
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    update(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const newMarkup = this._generateMarkup();
        const virtualDom = document.createRange().createContextualFragment(newMarkup);
        const newElement = Array.from(virtualDom.querySelectorAll('*'));
        const oldElement = Array.from(this._parentElement.querySelectorAll('*'));
        // console.log(newElement,oldElement);

        newElement.forEach((newEl,i)=>{
            const oldEl = oldElement[i];
            if(!newEl.isEqualNode(oldEl) && oldEl.firstChild.nodeValue.trim() !== ''){
                oldEl.textContent = newEl.textContent;
            };  

            if(!newEl.isEqualNode(oldEl)){
                Array.from(newEl.attributes).forEach(attr=>{
                    oldEl.setAttribute(attr.name,attr.value);
                });
            }
        })
        
        // this._clear();
        // this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    renderSpinner() {
        const markup = `<div class="spinner">
        <svg>
        <use href="${icons
            }#icon-loader"></use>
        </svg>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }


    // Error message function
    renderError(error_message = this._errorMessage) {
        const markup = `<div class="error">
        <div>
              <svg>
              <use href="${icons}/icons.svg#icon-alert-triangle"></use>
              </svg>
              </div>
              <p>${error_message}</p>
              </div> `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    //Success Message 
    renderMessage(success_message = this._message) {
        const markup = `<div class="message">
                <div>
                <svg>
                <use href="${icons}/icons.svg#icon-smile"></use>
                </svg>
                </div>
                <p>${success_message}</p>
                </div> `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }
}