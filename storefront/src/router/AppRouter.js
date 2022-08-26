import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "../components/Products";
import Product from "../components/Product";
import Cart from "../components/Cart";

class AppRouter extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Products/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;
