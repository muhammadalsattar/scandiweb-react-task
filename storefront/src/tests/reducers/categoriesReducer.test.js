import categoriesReducer from "../../reducers/categoriesReducer";
import { setCategories, setDefaultCategory } from "../../actions/categories";
import {initialState} from "../../setupTests"

let defaultState;
let categories;
beforeAll = (()=> {
    defaultState = {
        categories: [],
        defaultCategory: ''
    }
    categories = initialState.categories
})

test("Should set categories correctly", ()=>{
    const state = categoriesReducer(defaultState, setCategories(categories))
    expect(state.categories).toEqual(categories)
})