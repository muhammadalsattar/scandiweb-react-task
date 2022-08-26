import Store from '../store/Store';

import { setCategories } from '../actions/categories';
import { setCurrencies } from '../actions/currencies';
import { setDefaultCategory } from '../actions/categories';
import { setDefaultCurrency } from '../actions/currencies';
import {
    getCategories,
    getCurrencies,
    getProductsByCategory,
} from '../apollo/requests';
import { setProducts } from '../actions/products';

const setup = async () => {
    const categories = await getCategories();
    const currencies = await getCurrencies();
    const products = await getProductsByCategory(categories[0].name);

    Store.dispatch(setCategories(categories.slice(1)));
    Store.dispatch(setCurrencies(currencies));
    Store.dispatch(setDefaultCategory(categories[1]));
    Store.dispatch(setDefaultCurrency(currencies[0]));
    Store.dispatch(setProducts(products));
};

export default setup;
