const defaultState = {
    currencies: [],
    defaultCurrency: {}
};

const currencyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENCIES':
            return {
                ...state,
                currencies: action.currencies
            }
        case 'SET_DEFAULT_CURRENCY':
            return {
                ...state,
                defaultCurrency: action.defaultCurrency
            }
        default:
            return state;
    }
}

export default currencyReducer;