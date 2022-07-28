import React from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import {pickPrice, calculateTotal} from "../utils/utils";
import { removeFromCart, addToCart } from "../actions/cart";


class Cart extends React.Component {
    updateCart = (product) => {
        this.props.updateCart(product);
    }
    removeItem = (id) => {
        this.props.removeItem(id);
    }
    calculateQuantity = () => {
        let quantity = 0;
        this.props.cart.forEach(product => {
            quantity += product.quantity;
        })
        return quantity;
    }
    changeImage = (e) => {
        e.preventDefault();
        const gallery = this.props.cart.find(product => product.id === e.target.id).gallery;
        const index = gallery.indexOf(e.target.parentNode.parentNode.firstChild.src);
        if (e.target.innerHTML === '&lt;') {
            if (index > 0) {
                e.target.parentNode.parentNode.firstChild.src = gallery[index - 1];
            } else {
                e.target.parentNode.parentNode.firstChild.src = gallery[gallery.length - 1];
            }
        } else {
            if (index < gallery.length - 1) {
                e.target.parentNode.parentNode.firstChild.src = gallery[index + 1];
            } else {
                e.target.parentNode.parentNode.firstChild.src = gallery[0];
            }
        }
    }
    render() {
        return (
            <div className="cart-page">
                <Navbar />
                <div className="cart page-body">
                    <h1 className="cart-heading">Cart</h1>
                    <div className="cart-items">{this.props.cart.map((product, index) =>(
                        <div className="cart-item" key={index}>
                            <div className="item-details">
                                <h2 className="brand">{product.brand}</h2>
                                <h2 className="name">{product.name}</h2>
                                <h3 className="price">{this.props.defaultCurrency.symbol}{pickPrice(product.prices, this.props.defaultCurrency)}</h3>
                                {
                                product.attributes.map((attribute, index) =>(
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
                                ))}
                            </div>
                            <div className="quantity-image">
                                <div className="quantity">
                                    <button onClick={()=>{this.updateCart({...product, quantity: 1})}}>+</button>
                                    <p>{product.quantity}</p>
                                    <button onClick={()=>{product.quantity > 1? this.updateCart({...product, quantity: -1}) : this.removeItem(product.id) }}>-</button>
                                </div>
                                <div className="image">
                                    <img src={product.gallery[0]} alt={product.name}></img>
                                    <div className="browse">
                                        <button id={product.id} onClick={this.changeImage}>{`<`}</button>
                                        <button id={product.id} onClick={this.changeImage}>{`>`}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="cart-summary">
                        <p>Tax 21%: <b>{this.props.defaultCurrency?.symbol} {(calculateTotal(this.props.cart, this.props.defaultCurrency) * (21/100)).toFixed(2)}</b></p>
                        <p>Quantity: <b>{this.calculateQuantity()}</b></p>
                        <p>Total: <b>{this.props.defaultCurrency?.symbol} {calculateTotal(this.props.cart, this.props.defaultCurrency)}</b></p>
                        <button>Order</button>
                    </div>
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
        defaultCurrency: state.currencies.defaultCurrency,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);