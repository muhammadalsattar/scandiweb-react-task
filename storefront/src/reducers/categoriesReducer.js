const defaultState = {
    categories: [],
    defaultCategory: ''
};

const categoriesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.categories
            }
        case 'SET_DEFAULT_CATEGORY':
            return {
                ...state,
                defaultCategory: action.category
            }
        default:
            return state;
    }
}

export default categoriesReducer;