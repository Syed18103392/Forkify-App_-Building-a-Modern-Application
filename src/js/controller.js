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

const controlPagination= function(goto){
  console.log(goto);
  // Render result
  resultView.render(model.getSearchResultPerPage(goto));
  console.log(model.getSearchResultPerPage(goto)  );

  //render the pagination 
  paginationView.render(model.state.search);
}


const controlServing = function(updateTo){
  // 1) Update Service 

  model.updateService(updateTo);
  // console.log(model.state.recipe);
  // 2) Update View 
  const { recipe } = model.state;

  // 2) Rendering recipe 
  recipeView.render(recipe);
}
const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlServing)
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerPagination(controlPagination);

}
init();