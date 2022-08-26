import cartReducer from '../../reducers/cartReducer';
import { addToCart, removeFromCart } from '../../actions/cart';
import { initialState } from '../../setupTests';

let products;
let defaultState;
beforeAll(() => {
    products = initialState.products;
    defaultState = { cart: [] };
});

test('Should add product to cart', () => {
    const state = cartReducer(defaultState, addToCart(products[0]));
    expect(state).toEqual({ cart: [products[0]] });
});

test('Should update quantity of product in cart', () => {
    const state = cartReducer({ cart: [products[0]] }, addToCart(products[0]));
    expect(state).toEqual({
        cart: [
            {
                ...products[0],
                quantity: products[0].quantity + products[0].quantity,
            },
        ],
    });
});

test('Should remove correct product from cart', () => {
    const state = cartReducer(
        { cart: [products[0], products[1]] },
        removeFromCart(products[0])
    );
    expect(state).toEqual({ cart: [products[1]] });
});
