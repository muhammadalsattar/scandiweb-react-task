import currencyReducer from "../../reducers/currencyReducer";
import {setCurrencies, setDefaultCurrency} from "../../actions/currencies"
import {initialState} from "../../setupTests"

let defaultState;
let currencies;

beforeAll(() => {
    defaultState = {
        currencies: [],
        defaultCurrency: {}
    }
    currencies = initialState.currencies
  });


test("Should set currencies correctly", ()=>{
    const state = currencyReducer(defaultState, setCurrencies(currencies))
    expect(state.currencies).toEqual(currencies)
})

test("Should set default currency correctly", ()=>{
    const state = currencyReducer(defaultState, setDefaultCurrency(currencies[0]))
    expect(state.defaultCurrency).toEqual(currencies[0])
})