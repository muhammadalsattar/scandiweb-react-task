import React from "react";
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Products from "../components/Products";
import Product from "../components/Product";
import Cart from "../components/Cart";

const history = createBrowserHistory({window});
class AppRouter extends React.Component {
    render() {
        return(
            <HistoryRouter history={history}>
                <Routes>
                    <Route path="/" exact element={<Products/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </HistoryRouter>
        )
    }
}

export {history, AppRouter as default};
