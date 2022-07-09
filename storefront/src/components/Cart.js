import React from "react";
import { connect } from "react-redux";
import {updateCartItem, removeFromCart} from "../actions/cart";
import pickPrice from "../utils/pickPrice";


class Cart extends React.Component {
    updateCart = (product) => {
        this.props.updateCart(product);
    }
    removeItem = (id) => {
        this.props.removeItem(id);
    }
    calculateTotal = () => {
        let total = 0;
        this.props.cart.forEach(product => {
            total += pickPrice(product.prices, this.props.defaultCurrency) * product.quantity;
        })
        return total.toFixed(2);
    }
    calculateQuantity = () => {
        let quantity = 0;
        this.props.cart.forEach(product => {
            quantity += product.quantity;
        })
        return quantity;
    }
    render() {
        return (
            <div className="cart">
                <h1>Cart</h1>
                <div className="cart-items">
                    {this.props.cart.map((product) => {
                        return (
                            <div className="cart-item" key={product.id}>
                                <hr/>
                                <h3>{product.brand}</h3>
                                <h4>{product.name}</h4>
                                <p>{this.props.defaultCurrency.symbol} {pickPrice(product.prices, this.props.defaultCurrency)}</p>
                                <div className="cart-item-attributes">
                                    {product.attributes.map((attribute) => {
                                        return (
                                            <div className="cart-item-attribute" key={attribute.id}>
                                                <h5>{attribute.name}</h5>
                                                {attribute.items.map((item) => {
                                                    return (
                                                        <button key={item.id}>{item.value}</button>
                                                    )
                                                }
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                                <button onClick={()=>{this.updateCart({...product, quantity: 1})}}>+</button>
                                <p>Quantity: {product.quantity}</p>
                                <button onClick={()=>{product.quantity > 1? this.updateCart({...product, quantity: -1}) : this.removeItem(product.id) }}>-</button>
                                <img src={product.gallery[0]} alt={product.name} style={{width: 50}}></img>
                            </div>
                        )
                    })}
                </div>
                <p>Tax 21%: {this.props.defaultCurrency?.symbol} {(this.calculateTotal() * (21/100)).toFixed(2)}</p>
                <p>Quantity: {this.calculateQuantity()}</p>
                <p>Total: {this.props.defaultCurrency?.symbol} {this.calculateTotal()}</p>
                <button>Order</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCart: (product) => {
            dispatch(updateCartItem(product));
        },
        removeItem: (productID) => {
            dispatch(removeFromCart(productID));
        }
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        defaultCurrency: state.currencies.defaultCurrency,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);