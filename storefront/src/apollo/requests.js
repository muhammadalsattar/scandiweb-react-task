import client from './client';
import {
    GET_PRODUCTS,
    GET_PRODUCT,
    GET_CATEGORIES,
    GET_CURRNCIES,
} from './queries';

export const getProductsByCategory = async name => {
    try {
        const { data } = await client.query({
            query: GET_PRODUCTS,
        });
        return data.categories.find(category => category.name === name)
            .products;
    } catch (error) {
        console.log(error);
    }
};

export const getProduct = async id => {
    try {
        const { data } = await client.query({
            query: GET_PRODUCT(id),
        });
        return data.product;
    } catch (error) {
        console.log(error);
    }
};

export const getCategories = async () => {
    try {
        const { data } = await client.query({
            query: GET_CATEGORIES,
        });
        return data.categories;
    } catch (error) {
        console.log(error);
    }
};

export const getCurrencies = async () => {
    try {
        const { data } = await client.query({
            query: GET_CURRNCIES,
        });
        return data.currencies;
    } catch (error) {
        console.log(error);
    }
};
