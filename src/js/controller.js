import * as model from '../js/model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
 
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');


const controlRecipes = async function(){ 
  try{
    const id = window.location.hash.slice(1);
    if(!id) return;

     recipeView.renderSpinner();
  
  // 1) rendeding pizza info 
    await model.loadRecipe(id);

    const {recipe}  = model.state; 
    console.log(recipe);
    // 2) Rendering recipe 
    recipeView.render(recipe);
    }
    catch(e){
      recipeView.renderError();
    }

}

const controlSearchResult = async function(){
  try{
    // 1) Get search query
      const query = searchView.getQuery(); 
      if(!query) return ;

    // Load result
      await model.loadSearchResult(query);
    
    // Render result
      console.log(model.state.search.result);

  }catch(e){

  }
}


const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
}
init();