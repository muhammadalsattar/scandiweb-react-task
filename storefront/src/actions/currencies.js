const setCurrencies = (currencies) => ({
    type: 'SET_CURRENCIES',
    currencies
});
const setDefaultCurrency = (defaultCurrency) => ({
    type: 'SET_DEFAULT_CURRENCY',
    defaultCurrency
});

export { setCurrencies, setDefaultCurrency };