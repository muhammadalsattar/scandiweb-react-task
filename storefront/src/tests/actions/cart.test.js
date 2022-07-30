import {addToCart, removeFromCart} from '../../actions/cart';
import { initialState } from '../../setupTests';

test('addToCart returns correct action', () => {
    const product = initialState.products[0];
    const action = addToCart(product);
    expect(action).toEqual({
        type: 'ADD_TO_CART',
        product
    });
})

test('removeFromCart returns correct action', () => {
    const id = initialState.products[0].id;
    const action = removeFromCart(id);
    expect(action).toEqual({
        type: 'REMOVE_FROM_CART',
        id
    });
})