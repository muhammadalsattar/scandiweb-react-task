import client from './client';
import { GET_PRODUCTS, GET_PRODUCT, GET_CATEGORIES, GET_CURRNCIES } from './queries';

export const getProductsByCategory = async (name) => {
    const {data} = await client.query({
        query: GET_PRODUCTS
    })
    return data.categories.find(category => category.name === name).products;
}

export const getProduct = async (id) => {
    const {data} = await client.query({
        query: GET_PRODUCT(id)
    })
    return data.product;
}

export const getCategories = async () => {
    const {data} = await client.query({
        query: GET_CATEGORIES
    })
    return data.categories;
}

export const getCurrencies = async () => {
    const {data} = await client.query({
        query: GET_CURRNCIES
    })
    return data.currencies;
}