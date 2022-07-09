const defaultState = {
    products: [],
    activeProduct: null,
};

const productsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.products
            }
        case 'SET_ACTIVE_PRODUCT':
            return {
                ...state,
                activeProduct: action.product
            }
        default:
            return state;
    }
}

export default productsReducer;