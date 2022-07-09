import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {updateCartItem, removeFromCart} from "../actions/cart";
import pickPrice from "../utils/pickPrice";

class CartOverlay extends React.Component {
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
    render() {
        return (
            <div className="cart-overlay" hidden>
                <p><i>My Bag: </i>{this.props.cart.length} items</p>
                {this.props.cart.map((product) => {
                    return (
                        <div className="cart-item" key={product.id}>
                            <p>{product.name}</p>
                            <p>{this.props.defaultCurrency.symbol}{pickPrice(product.prices, this.props.defaultCurrency)}</p>
                            {
                                product.attributes.map((attribute, index) => {
                                    return (
                                        <div className="cart-item-attribute" key={attribute.name}>
                                            <p>{attribute.name}</p>
                                            {
                                                attribute.items.map((item) => {
                                                    return (
                                                        <div className="cart-item-attribute-item" key={item.id}>
                                                            {
                                                                item.value === product.selectedAttr[index].value ? <p className="selected">{item.value}</p> : <p>{item.value}</p>
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                            <button onClick={()=>{this.updateCart({...product, quantity: 1})}}>+</button>
                            <p>Quantity: {product.quantity}</p>
                            <button onClick={()=>{product.quantity > 1? this.updateCart({...product, quantity: -1}) : this.removeItem(product.id) }}>-</button>
                            <img src={product.gallery[0]} alt={product.name} style={{width: 50}}></img>
                        </div>
                    )
                }
                )}
                <p>Total: {this.props.defaultCurrency.symbol}{this.calculateTotal()}</p>
                <Link to="/cart">View Bag</Link>
                <button>Checkout</button>
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
        defaultCurrency: state.currencies.defaultCurrency
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);