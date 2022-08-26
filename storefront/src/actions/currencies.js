const setCurrencies = currencies => ({
    type: 'SET_CURRENCIES',
    currencies,
});
const setDefaultCurrency = currency => ({
    type: 'SET_DEFAULT_CURRENCY',
    currency,
});

export { setCurrencies, setDefaultCurrency };
