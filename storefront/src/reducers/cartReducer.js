const defaultState = {
    cart: [],
};

const cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: state.cart.find(product => product.id === action.product.id && product.selectedAttr.every((attr, index) => attr.name === action.product.selectedAttr[index].name && attr.value === action.product.selectedAttr[index].value))?
                    state.cart.map(product => product.id === action.product.id && product.selectedAttr.every((attr, index) => attr.name === action.product.selectedAttr[index].name && attr.value === action.product.selectedAttr[index].value) ? {...product, quantity: product.quantity + action.product.quantity}: product) :
                    [...state.cart, action.product]
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(product => product.id === action.product.id && (product.selectedAttr.every((attr, index) => attr.name !== action.product.selectedAttr[index].name || attr.value !== action.product.selectedAttr[index].value)))
            }
        default:
            return state;
    }
}

export default cartReducer;