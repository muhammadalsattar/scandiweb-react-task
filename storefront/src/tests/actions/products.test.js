import {setProducts, setActiveProduct, setLoadedProducts} from '../../actions/products';
import {initialState} from '../../setupTests';

test('setProducts returns correct action', () => {
    const products = initialState.products;
    const action = setProducts(products);
    expect(action).toEqual({
        type: 'SET_PRODUCTS',
        products
    });
})

test('setActiveProduct returns correct action', () => {
    const product = initialState.products[0];
    const action = setActiveProduct(product);
    expect(action).toEqual({
        type: 'SET_ACTIVE_PRODUCT',
        product
    });
})

test('setLoadedProducts returns correct action', () => {
    const loadedProducts = initialState.loadedProducts;
    const action = setLoadedProducts(loadedProducts);
    expect(action).toEqual({
        type: 'SET_LOADED_PRODUCTS',
        loadedProducts
    });
})