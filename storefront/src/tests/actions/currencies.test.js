import {setCurrencies, setDefaultCurrency} from "../../actions/currencies";
import {initialState} from "../../setupTests";

let currencies;
beforeAll(() => {
    currencies = initialState.currencies;
})

test("setCurrencies returns correct action", () => {
    const action = setCurrencies(currencies);
    expect(action).toEqual({
        type: "SET_CURRENCIES",
        currencies
    });
})

test("setDefaultCurrency returns correct action", () => {
    const action = setDefaultCurrency(currencies[0]);
    expect(action).toEqual({
        type: "SET_DEFAULT_CURRENCY",
        currency: currencies[0]
    });
})