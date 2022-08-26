const defaultState = {
    products: [],
    activeProduct: null,
    loadedProducts: 5,
};

const productsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.products,
            };
        case 'SET_ACTIVE_PRODUCT':
            return {
                ...state,
                activeProduct: action.product,
            };
        case 'SET_LOADED_PRODUCTS':
            return {
                ...state,
                loadedProducts: action.loadedProducts,
            };
        default:
            return state;
    }
};

export default productsReducer;
