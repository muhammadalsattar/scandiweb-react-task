import cartReducer from "../../reducers/cartReducer";
import {initialState} from "../../setupTests";

test("Should return correct state with addToCart action", () => {
    const product = initialState.products[0];
    const action = {
        type: 'ADD_TO_CART',
        product
    };
    const newState = cartReducer({cart: []}, action);
    expect(newState).toEqual({cart: [action.product]});
})

test("Should return correct state with removeFromCart action", () => {
    const id = initialState.cart[0].id;
    const action = {
        type: 'REMOVE_FROM_CART',
        id
    };
    const newState = cartReducer({cart: initialState.cart}, action);
    expect(newState).toEqual({cart: initialState.cart.filter(product => product.id !== action.id)});
})