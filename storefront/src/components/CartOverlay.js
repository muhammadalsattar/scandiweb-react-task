import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, addToCart } from "../actions/cart";
import {pickPrice, calculateTotal} from "../utils/utils";

export class CartOverlay extends React.Component {
    updateCart = (product) => {
        this.props.updateCart(product);
    }
    removeItem = (product) => {
        this.props.removeItem(product);
    }
    render() {
        return (
            <div className="cart-overlay" hidden>
                <p><b>My Bag, </b>{this.props.cart.length} items</p>
                {this.props.cart.map(({id, name, brand, attributes, selectedAttr, gallery, prices, quantity}, index) => (
                    <div className="cart-item" key={index}>
                    <div className="details">
                        <p className="brand">{brand}</p>
                        <p className="name">{name}</p>
                        <p><b>{this.props.defaultCurrency.symbol}{pickPrice(prices, this.props.defaultCurrency)}</b></p>
                        {
                        attributes.map(({name, items}, index) =>
                            (
                                <div className="cart-item-attribute" key={name}>
                                    <p className="attribute-name">{name}:</p>
                                    <div className="attribute-value">
                                    {
                                    items.map(({value}) =>
                                        name === "Color" ?
                                            value === selectedAttr[index].value ?
                                                <div className={name + ' selected'} key={value}><button style={{backgroundColor: value}}/></div>:
                                                <div className={name} key={value}><button style={{backgroundColor: value}}/></div>
                                            :
                                            value === selectedAttr[index].value?
                                                <div className='other-attr selected' key={value}><button>{value}</button></div>:
                                                <div className='other-attr' key={value}><button>{value}</button></div>
                                        )
                                    }
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <div className="quantity-image">
                        <div className="quantity">
                            <button onClick={()=>{this.updateCart({id, quantity: 1, selectedAttr})}}>+</button>
                            <p><b>{quantity}</b></p>
                            <button onClick={()=>{quantity > 1? this.updateCart({id, quantity: -1, selectedAttr}) : this.removeItem({id, selectedAttr}) }}>-</button>
                        </div>
                        <div className="image">
                            <img src={gallery[0]} alt={name}></img>
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
        removeItem: (product) => {
            dispatch(removeFromCart(product));
        }
    }
}

const mapStateToProps = ({cart, currencies}) => {
    return {
        cart: cart.cart,
        defaultCurrency: currencies.defaultCurrency
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);