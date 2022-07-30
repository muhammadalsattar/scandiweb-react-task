import currencyReducer from "../../reducers/currencyReducer";
import { initialState } from "../../setupTests";

test("Should set currencies", () => {
    const currencies = initialState.currencies;
    const action = {
        type: 'SET_CURRENCIES',
        currencies
    };
    const newState = currencyReducer({currencies: [], defaultCurrency: {}}, action);
    expect(newState).toEqual({currencies, defaultCurrency: {}});
})

test("Should set default currency", () => {
    const currency = initialState.currencies[0];
    const action = {
        type: 'SET_DEFAULT_CURRENCY',
        defaultCurrency: currency
    };
    const newState = currencyReducer({currencies: [], defaultCurrency: {}}, action);
    expect(newState).toEqual({currencies: [], defaultCurrency: currency});
})