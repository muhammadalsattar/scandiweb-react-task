import {addToCart, removeFromCart} from '../../actions/cart';
import { initialState } from '../../setupTests';

let product;
beforeAll(() => {
    product = initialState.products[0];
})

test('addToCart returns correct action', () => {
    const action = addToCart(product);
    expect(action).toEqual({
        type: 'ADD_TO_CART',
        product
    });
})

test('removeFromCart returns correct action', () => {
    const action = removeFromCart(product);
    expect(action).toEqual({
        type: 'REMOVE_FROM_CART',
        product
    });
})