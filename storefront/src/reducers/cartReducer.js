const defaultState = {
    cart: [],
};

const cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.product]
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(product => product.id !== action.id)
            }
        case 'UPDATE_CART_ITEM':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product.id === action.product.id && product.selectedAttr.every((attr, index) => attr.name === action.product.selectedAttr[index].name && attr.value === action.product.selectedAttr[index].value)) {
                        return {
                            ...product,
                            quantity: product.quantity + action.product.quantity
                        }
                    }
                    return product;
                })
            }
        default:
            return state;
    }
}

export default cartReducer;