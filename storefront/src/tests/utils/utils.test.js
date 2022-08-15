import {pickPrice, calculateTotal, calcualteTax, calculateQuantity, loadProducts} from "../../utils/utils"
import { initialState } from "../../setupTests"

let products;
let currencies;
let total = 0
let quantity = 0
let loadedProducts;
beforeAll(()=>{
    products = initialState.products
    currencies = initialState.currencies
    products.forEach(product=> total += product.prices.find(price=>price.currency.label === currencies[0].label).amount)
    products.forEach(product=> quantity+= product.quantity)
    loadedProducts = 0
})

test("Should pick default currency price correctly", ()=>{
    const result = pickPrice(products[0].prices, currencies[0])
    expect(result).toBe(products[0].prices[0].amount)
})

test("Should calculate total cart items cost", ()=>{
    const result = calculateTotal(products, currencies[0])
    expect(result).toBe(Math.round((total + Number.EPSILON) * 100) / 100)
})

test("Should calculate total cost tax", ()=>{
    const result = calcualteTax(total)
    expect(result).toBe((total * (21/100)).toFixed(2))
})

test("Should calculate cart items quantity correctly", ()=>{
    const result = calculateQuantity(products)
    expect(result).toBe(quantity)
})

test("Should load products correctly", ()=>{
    const result = loadProducts(products, loadedProducts)
    expect(result).toEqual(products.slice(loadedProducts, loadedProducts + 5))
})