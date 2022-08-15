import {setCategories, setDefaultCategory} from '../../actions/categories';
import { initialState } from '../../setupTests';

let categories;
beforeAll(() => {
    categories = initialState.categories;
})

test("setCategories returns correct action", () => {
    const action = setCategories(categories);
    expect(action).toEqual({
        type: 'SET_CATEGORIES',
        categories
    });
})

test("setDefaultCategory returns correct action", () => {
    const action = setDefaultCategory(categories[0]);
    expect(action).toEqual({
        type: 'SET_DEFAULT_CATEGORY',
        category: categories[0]
    });
})