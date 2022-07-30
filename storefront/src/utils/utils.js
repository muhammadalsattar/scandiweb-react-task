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
        console.log(newProducts);
        Store.dispatch(setLoadedProducts(products.length));
        return newProducts;
    }
    else {
        newProducts = products.slice(loadedProducts, loadedProducts + 5);
        console.log(newProducts);
        Store.dispatch(setLoadedProducts(loadedProducts + 5));
        return newProducts;
    }
}

export {pickPrice, calculateTotal, loadProducts};