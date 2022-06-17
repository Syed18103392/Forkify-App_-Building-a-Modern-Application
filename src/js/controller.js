import * as model from '../js/model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot){
  module.hot.accept();
}

const controlRecipes = async function(){ 
  try{
    const id = window.location.hash.slice(1);
    if(!id) return;

     recipeView.renderSpinner();
  
  // 1) rendeding pizza info 
    await model.loadRecipe(id);

    const {recipe}  = model.state; 
    // console.log(recipe);
    // 2) Rendering recipe 
    recipeView.render(recipe);
    }
    catch(e){
      recipeView.renderError();
    }

}

const controlSearchResult = async function(){
  try{
    // 0) Load Spinner 
    resultView.renderSpinner();

    // 1) Get search query
      const query = searchView.getQuery(); 
      if(!query) return ;

    // Load result
      await model.loadSearchResult(query);
    
    // Render result
    resultView.render(model.getSearchResultPerPage());
    console.log(model.getSearchResultPerPage());
    
    //render the pagination 
     paginationView.render(model.state.search);

  }catch(e){

  }
}

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);

}
init();