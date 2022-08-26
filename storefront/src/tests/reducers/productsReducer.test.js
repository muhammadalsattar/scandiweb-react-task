import productsReducer from '../../reducers/productsReducer';
import {
    setProducts,
    setLoadedProducts,
    setActiveProduct,
} from '../../actions/products';
import { initialState } from '../../setupTests';

let defaultState;
let products;
beforeAll(() => {
    defaultState = {
        products: [],
        activeProduct: null,
        loadedProducts: 5,
    };
    products = initialState.products;
});

test('Should set products correctly', () => {
    const state = productsReducer(defaultState, setProducts(products));
    expect(state.products).toEqual(products);
});

test('Should set loaded products correctly', () => {
    const state = productsReducer(defaultState, setLoadedProducts(10));
    expect(state.loadedProducts).toEqual(10);
});

test('Should set active product correctly', () => {
    const state = productsReducer(defaultState, setActiveProduct(products[0]));
    expect(state.activeProduct).toEqual(products[0]);
});
