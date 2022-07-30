import productsReducer from "../../reducers/productsReducer";
import { initialState } from "../../setupTests";

test("Should set products", () => {
    const products = initialState.products;
    const action = {
        type: 'SET_PRODUCTS',
        products
    };
    const newState = productsReducer({products: [], activeProduct: null, loadedProducts: 0}, action);
    expect(newState).toEqual({products, activeProduct: null, loadedProducts: 0});
})

test("Should set active product", () => {
    const product = initialState.products[0];
    const action = {
        type: 'SET_ACTIVE_PRODUCT',
        product
    };
    const newState = productsReducer({products: [], activeProduct: null, loadedProducts: 0}, action);
    expect(newState).toEqual({products: [], activeProduct: product, loadedProducts: 0});
})

test("Should set loaded products", () => {
    const loadedProducts = initialState.loadedProducts;
    const action = {
        type: 'SET_LOADED_PRODUCTS',
        loadedProducts
    };
    const newState = productsReducer({products: [], activeProduct: null, loadedProducts: 0}, action);
    expect(newState).toEqual({products: [], activeProduct: null, loadedProducts});
})