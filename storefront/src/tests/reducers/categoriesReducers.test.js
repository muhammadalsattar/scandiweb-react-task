import categoriesReducer from "../../reducers/categoriesReducer";
import { initialState } from "../../setupTests";

test("Should set categories", () => {
    const categories = initialState.categories;
    const action = {
        type: 'SET_CATEGORIES',
        categories
    };
    const newState = categoriesReducer({categories, defaultCategory: ''}, action);
    expect(newState).toEqual({categories, defaultCategory: ''});
});

test("Should set default category", () => {
    const category = initialState.categories[0];
    const action = {
        type: 'SET_DEFAULT_CATEGORY',
        category
    };
    const newState = categoriesReducer({categories: [], defaultCategory: ''}, action);
    expect(newState).toEqual({categories: [], defaultCategory: category});
})