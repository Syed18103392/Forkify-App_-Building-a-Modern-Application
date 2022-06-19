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
        state.bookmarkes.some(bookmark=>{
            if(bookmark.id === id)
                state.recipe.bookmarked = true;
            else
                state.recipe.bookmarked = false; 
        })

        console.log(state.recipe);
    }
    catch(err){
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
    }
    catch(e){
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
// NOTE Add bookmarked:

export const addBookmarked = (recipe)=>{
    // 1) push recipe to the bookmarked array
    state.bookmarkes.push(recipe);

    // 2) marked recipe bookmarked  ;
    if(recipe.id === state.recipe.id) return state.recipe.bookmarked=true;
}


// NOTE Delete bookmarked 
export const deleteBookmarked = id=>{
    const index = state.bookmarkes.find( el=>el.id===id );
    state.bookmarkes.splice(index,1);

    // 2) marked recipe NOT bookmarked 
    if (id === state.recipe.id) return state.recipe.bookmarked = false;
}