import Store from "../store/Store";
import { setLoadedProducts } from "../actions/products";

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

const loadProducts = (products, loadedProducts) => {
    let newProducts;
    if (products.length < loadedProducts + 5) {  
        newProducts = products.slice(loadedProducts, products.length);
        Store.dispatch(setLoadedProducts(products.length));
        return newProducts;
    }
    else {
        newProducts = products.slice(loadedProducts, loadedProducts + 5);
        Store.dispatch(setLoadedProducts(loadedProducts + 5));
        return newProducts;
    }
}

const calculateQuantity = (cart) => {
    let quantity = 0;
    cart.forEach(product => {
        quantity += product.quantity;
    }
    )
    return quantity;
}

const calcualteTax = (total) => {
    return (total * (21/100)).toFixed(2);
}

export {pickPrice, calculateTotal, loadProducts, calculateQuantity, calcualteTax};