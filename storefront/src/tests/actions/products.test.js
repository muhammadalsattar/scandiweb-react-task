import {
    setProducts,
    setActiveProduct,
    setLoadedProducts,
} from '../../actions/products';
import { initialState } from '../../setupTests';

let products;
let loadedProducts;
beforeAll(() => {
    products = initialState.products;
    loadedProducts = 5;
});

test('setProducts returns correct action', () => {
    const products = initialState.products;
    const action = setProducts(products);
    expect(action).toEqual({
        type: 'SET_PRODUCTS',
        products,
    });
});

test('setActiveProduct returns correct action', () => {
    const action = setActiveProduct(products[0]);
    expect(action).toEqual({
        type: 'SET_ACTIVE_PRODUCT',
        product: products[0],
    });
});

test('setLoadedProducts returns correct action', () => {
    const action = setLoadedProducts(loadedProducts);
    expect(action).toEqual({
        type: 'SET_LOADED_PRODUCTS',
        loadedProducts,
    });
});
