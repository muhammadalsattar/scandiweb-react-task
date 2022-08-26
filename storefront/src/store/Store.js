import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cartReducer';
import productsReducer from '../reducers/productsReducer';
import categoriesReducer from '../reducers/categoriesReducer';
import currencyReducer from '../reducers/currencyReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
    currencies: currencyReducer,
});
// creating store and combining reducers
const Store = configureStore({
    reducer: rootReducer,
});

export default Store;
