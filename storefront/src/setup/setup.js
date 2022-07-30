import Store from "../store/Store";
import {  setProducts } from "../actions/products";
import { setCategories } from "../actions/categories";
import { setCurrencies } from "../actions/currencies";
import { setDefaultCategory } from "../actions/categories";
import { setDefaultCurrency } from "../actions/currencies";

const getProducts = () => {
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: `
            {
                categories {
                  products {
                    id
                    name
                    inStock
                    gallery
                    description
                    category
                    attributes {
                      id
                      name
                      type
                      items {
                        displayValue
                        value
                        id
                      }
                    }
                    prices {
                      currency {
                        label
                        symbol
                      }
                      amount
                    }
                    brand
                  }
                }
              }
            `
        })
    }).then(
        response => response.json()
    ).then(
        data => {
            const products = data.data.categories[0].products;
            Store.dispatch(setProducts(products));
            return products;
        }
    )
}

const getCategories = () => {
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: `
            {
                categories {
                  name
                }
            }
            `
        })
    }).then(
        response => response.json()
    ).then(
        data => {
            const categories = data.data.categories;
            Store.dispatch(setCategories(categories));
            Store.dispatch(setDefaultCategory(categories[0]));
            return categories;
        }
    )
}

const getCurrencies = () => {
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: `
            {
                currencies {
                  label
                  symbol
                }
            }
            `
        })
    }).then(
        response => response.json()
    ).then(
        data => {
            const currencies = data.data.currencies;
            Store.dispatch(setCurrencies(currencies));
            Store.dispatch(setDefaultCurrency(currencies[0]));
            return currencies;
        })
}

const setup = async() => {
    getProducts();
    getCategories();
    getCurrencies();
};

export { setup as default ,getProducts, getCategories, getCurrencies };
