import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, addToCart } from "../actions/cart";
import {pickPrice, calculateTotal} from "../utils/utils";

export class CartOverlay extends React.Component {
    updateCart = (product) => {
        this.props.updateCart(product);
    }
    removeItem = (id) => {
        this.props.removeItem(id);
    }
    render() {
        return (
            <div className="cart-overlay" hidden>
                <p><b>My Bag, </b>{this.props.cart.length} items</p>
                {this.props.cart.map((product, index) => (
                    <div className="cart-item" key={index}>
                    <div className="details">
                        <p className="brand">{product.brand}</p>
                        <p className="name">{product.name}</p>
                        <p><b>{this.props.defaultCurrency.symbol}{pickPrice(product.prices, this.props.defaultCurrency)}</b></p>
                        {
                        product.attributes.map((attribute, index) =>
                            (
                                <div className="cart-item-attribute" key={attribute.name}>
                                    <p className="attribute-name">{attribute.name}:</p>
                                    <div className="attribute-value">
                                    {
                                    attribute.items.map((item) =>
                                        attribute.name === "Color" ?
                                            item.value === product.selectedAttr[index].value ?
                                                <div className={attribute.name + ' selected'} key={item.value}><button style={{backgroundColor: item.value}}/></div>:
                                                <div className={attribute.name} key={item.value}><button style={{backgroundColor: item.value}}/></div>
                                            :
                                            item.value === product.selectedAttr[index].value?
                                                <div className='other-attr selected' key={item.value}><button>{item.value}</button></div>:
                                                <div className='other-attr' key={item.value}><button>{item.value}</button></div>
                                        )
                                    }
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <div className="quantity-image">
                        <div className="quantity">
                            <button onClick={()=>{this.updateCart({...product, quantity: 1})}}>+</button>
                            <p><b>{product.quantity}</b></p>
                            <button onClick={()=>{product.quantity > 1? this.updateCart({...product, quantity: -1}) : this.removeItem(product.id) }}>-</button>
                        </div>
                        <div className="image">
                            <img src={product.gallery[0]} alt={product.name} style={{width: 50}}></img>
                        </div>
                    </div>
                </div>
                ))}
                <div className="cart-total">
                    <p>Total</p>
                    <p>{this.props.defaultCurrency.symbol}{calculateTotal(this.props.cart, this.props.defaultCurrency)}</p>
                </div>
                <div className="bag-checkout">
                    <div className="view-bag"><Link to="/cart"><button>View Bag</button></Link></div>
                    <div className="checkout"><button>Check out</button></div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCart: (product) => {
            dispatch(addToCart(product));
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