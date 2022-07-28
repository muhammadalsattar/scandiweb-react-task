import React from "react";
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Products from "../components/Products";
import Product from "../components/Product";
import Cart from "../components/Cart";

const history = createBrowserHistory({window});
class AppRouter extends React.Component {
    componentDidMount() {
        const currencyIcon = document.querySelector('.navbar .currency-icon');
        const cartIcon = document.querySelector('.navbar .cart-img img');
        document.addEventListener('click', (e) => {
            if (e.target !== currencyIcon) {
                document.querySelector(".currency-dropdown").setAttribute("hidden", "true");
                document.querySelector(".currency-drop-icon").style.transform = "rotate(0deg)";
            }
            if (e.target !== cartIcon) {
                document.querySelector(".cart-overlay").setAttribute("hidden", "true");
                document.querySelector(".page-body").classList.remove("faded")
            }
        })
    }
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
