import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";

class CartPage extends React.Component {
    render() {
        return (
            <div className="cart-section">
                <Navbar/>
                <Cart/>
            </div>
        )
    }
}

export default CartPage;