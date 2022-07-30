import {setCurrencies, setDefaultCurrency} from "../../actions/currencies";
import {initialState} from "../../setupTests";

test("setCurrencies returns correct action", () => {
    const currencies = initialState.currencies;
    const action = setCurrencies(currencies);
    expect(action).toEqual({
        type: "SET_CURRENCIES",
        currencies
    });
})

test("setDefaultCurrency returns correct action", () => {
    const defaultCurrency = initialState.defaultCurrency;
    const action = setDefaultCurrency(defaultCurrency);
    expect(action).toEqual({
        type: "SET_DEFAULT_CURRENCY",
        defaultCurrency
    });
})