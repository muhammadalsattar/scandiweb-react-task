import {setCategories, setDefaultCategory} from '../../actions/categories';
import { initialState } from '../../setupTests';

test("setCategories returns correct action", () => {
    const categories = initialState.categories;
    const action = setCategories(categories);
    expect(action).toEqual({
        type: 'SET_CATEGORIES',
        categories
    });
})

test("setDefaultCategory returns correct action", () => {
    const category = initialState.categories[0];
    const action = setDefaultCategory(category);
    expect(action).toEqual({
        type: 'SET_DEFAULT_CATEGORY',
        category
    });
})