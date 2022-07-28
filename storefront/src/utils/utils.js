const pickPrice = (prices, defaultCurrency) => {
    return prices.find(price => price.currency.symbol === defaultCurrency.symbol)?.amount;
}

const calculateTotal = (cart, defaultCurrency) => {
    let total = 0;
    cart.forEach(product => {
        total += pickPrice(product.prices, defaultCurrency) * product.quantity;
    })
    return total.toFixed(2);
}

export {pickPrice, calculateTotal};