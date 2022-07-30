import { pickPrice, calculateTotal, loadProducts } from "../../utils/utils";
import {initialState} from "../../setupTests"

test("Should pick price", () => {
    const product = initialState.products[0];
    const price = pickPrice(product.prices, initialState.currencies[0]);
    expect(price).toEqual(product.prices.find(price => price.currency.symbol === initialState.currencies[0].symbol).amount);
})

test("Should calculate total", () => {
    const cart = initialState.cart;
    const total = calculateTotal(cart, initialState.currencies[0]);
    expect(total).toEqual(initialState.cart.reduce((total, product) => {
        return total + pickPrice(product.prices, initialState.currencies[0]) * product.quantity;
    }, 0).toFixed(2));
})

test("Should load products", () => {
    const products = initialState.products;
    const loadedProducts = 0;
    const newProducts = loadProducts(products, loadedProducts);
    expect(newProducts).toEqual(products.slice(loadedProducts, loadedProducts + 5));
})