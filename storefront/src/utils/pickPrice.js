const pickPrice = (prices, defaultCurrency) => {
    return prices.find(price => price.currency.symbol === defaultCurrency.symbol)?.amount;
}

export default pickPrice;