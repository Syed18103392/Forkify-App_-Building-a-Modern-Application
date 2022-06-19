import {async} from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { POST_PER_PAGE } from './config.js';
export const state = {
    recipe  :   {},
    search : {
        query:  '',
        result: [],
        post_per_page: POST_PER_PAGE,
        currentPage : 1
    },
    bookmarkes : []
}

export const loadRecipe = async function(id){
    try {

        const data = await getJSON(`${API_URL}/${id}`);

        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        // console.log(state.bookmarkes);
        if(state.bookmarkes.some(bookmark=>bookmark.id === id))
                state.recipe.bookmarked = true;
            else
                state.recipe.bookmarked = false; 
        
    }
    catch(err){
        //console.log(err);
        throw err;
    }
}

export const loadSearchResult = async function (query){
    try{
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.result= data.data.recipes.map(recipe=>{
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                servings: recipe.servings,
                cookingTime: recipe.cooking_time,
                ingredients: recipe.ingredients
            }
        })
        //console.log(state.search);
    }
    catch(e){
        //console.log(e);
        throw e;
    }
}


export const getSearchResultPerPage = (page_number = state.search.currentPage) => {
    state.search.currentPage = page_number;
    const start = (page_number-1)*state.search.post_per_page;
    const end = page_number*state.search.post_per_page;
    return state.search.result.slice(start,end);
}

export const updateService = function (newServings){
    const oldServing = +state.recipe.servings;
    state.recipe.ingredients.forEach(ingredient =>{
        ingredient.quantity = (ingredient.quantity * newServings) / oldServing;
    })
    state.recipe.servings = newServings;
}


//NOTE Add data to the local storage 
const persistBookmark = function () {
    //console.log('loading......')
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarkes));
}

//NOTE Retrive Data From Localhost
const retriveBookmark = ()=>{
    // console.log('loading retriving...');
    const storage = JSON.parse(localStorage.getItem('bookmarks'));
    
    if(storage){ 
        state.bookmarkes = storage ;
    }
    // console.log(state.bookmarkes);
} 

// NOTE Add bookmarked:
export const addBookmarked = (recipe)=>{
    // Push recipe to the bookmarked array
    state.bookmarkes.push(recipe);
    
    // Marked recipe bookmarked  ;
    if(recipe.id === state.recipe.id)
        {
            state.recipe.bookmarked=true;
        }

    // Send data to the localstorage 
    persistBookmark();


}


// NOTE Delete bookmarked 
export const deleteBookmarked = id=>{
    const index = state.bookmarkes.find( el=>el.id===id );
    state.bookmarkes.splice(index,1);
        
    // Marked recipe NOT bookmarked 
    if (id === state.recipe.id)  state.recipe.bookmarked = false;
    
    // Send data to the localstorage 
    persistBookmark();
}

//NOTE Initialized function for initialized the data with page load 
const init = () => {
    retriveBookmark();
}
init();
