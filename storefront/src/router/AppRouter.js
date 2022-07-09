import React from "react";
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import ListingPage from "../components/ListingPage";
import ProductPage from "../components/ProductPage";
import CartPage from "../components/CartPage";

const history = createBrowserHistory({window});
class AppRouter extends React.Component {
    render() {
        return(
            <HistoryRouter history={history}>
                <Routes>
                    <Route path="/" exact element={<ListingPage/>}/>
                    <Route path="/product" element={<ProductPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                </Routes>
            </HistoryRouter>
        )
    }
}

export {history, AppRouter as default};
