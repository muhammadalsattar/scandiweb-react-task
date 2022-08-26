import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import {
    pickPrice,
    calculateTotal,
    calculateQuantity,
    calcualteTax,
} from '../utils/utils';
import { removeFromCart, addToCart } from '../actions/cart';

export class Cart extends React.Component {
    componentDidMount() {
        document
            .querySelectorAll('.cart .attribute-value button')
            .forEach(button => {
                button.style.backgroundColor = button.id;
            });
    }
    componentDidUpdate() {
        document
            .querySelectorAll('.cart .attribute-value button')
            .forEach(button => {
                button.style.backgroundColor = button.id;
            });
    }
    updateCart = product => {
        this.props.updateCart(product);
    };
    removeItem = product => {
        this.props.removeItem(product);
    };
    changeImage = e => {
        e.preventDefault();
        const gallery = this.props.cart.find(
            product => product.id === e.target.id
        ).gallery;
        const index = gallery.indexOf(
            e.target.parentNode.parentNode.firstChild.src
        );
        if (e.target.innerHTML === '&lt;') {
            if (index > 0) {
                e.target.parentNode.parentNode.firstChild.src =
                    gallery[index - 1];
            } else {
                e.target.parentNode.parentNode.firstChild.src =
                    gallery[gallery.length - 1];
            }
        } else {
            if (index < gallery.length - 1) {
                e.target.parentNode.parentNode.firstChild.src =
                    gallery[index + 1];
            } else {
                e.target.parentNode.parentNode.firstChild.src = gallery[0];
            }
        }
    };
    render() {
        return (
            <div className="cart-page">
                <Navbar />
                <div className="cart page-body">
                    <h1 className="cart-heading">Cart</h1>
                    <div className="cart-items">
                        {this.props.cart &&
                            this.props.cart.map(
                                (
                                    {
                                        id,
                                        brand,
                                        name,
                                        prices,
                                        attributes,
                                        selectedAttr,
                                        quantity,
                                        gallery,
                                    },
                                    index
                                ) => (
                                    <div className="cart-item" key={index}>
                                        <div className="item-details">
                                            <h2 className="brand">{brand}</h2>
                                            <h2 className="name">{name}</h2>
                                            <h3 className="price">
                                                {
                                                    this.props.defaultCurrency
                                                        .symbol
                                                }
                                                {pickPrice(
                                                    prices,
                                                    this.props.defaultCurrency
                                                )}
                                            </h3>
                                            {attributes.map(
                                                ({ name, items }, index) => (
                                                    <div
                                                        className="cart-item-attribute"
                                                        key={name}
                                                    >
                                                        <p className="attribute-name">
                                                            {name}:
                                                        </p>
                                                        <div className="attribute-value">
                                                            {items.map(
                                                                ({ value }) =>
                                                                    name ===
                                                                    'Color' ? (
                                                                        value ===
                                                                        selectedAttr[
                                                                            index
                                                                        ]
                                                                            .value ? (
                                                                            <div
                                                                                className={
                                                                                    name +
                                                                                    ' selected'
                                                                                }
                                                                                key={
                                                                                    value
                                                                                }
                                                                            >
                                                                                <button
                                                                                    id={
                                                                                        value
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <div
                                                                                className={
                                                                                    name
                                                                                }
                                                                                key={
                                                                                    value
                                                                                }
                                                                            >
                                                                                <button
                                                                                    id={
                                                                                        value
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        )
                                                                    ) : value ===
                                                                      selectedAttr[
                                                                          index
                                                                      ]
                                                                          .value ? (
                                                                        <div
                                                                            className="other-attr selected"
                                                                            key={
                                                                                value
                                                                            }
                                                                        >
                                                                            <button>
                                                                                {
                                                                                    value
                                                                                }
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <div
                                                                            className="other-attr"
                                                                            key={
                                                                                value
                                                                            }
                                                                        >
                                                                            <button>
                                                                                {
                                                                                    value
                                                                                }
                                                                            </button>
                                                                        </div>
                                                                    )
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className="quantity-image">
                                            <div className="quantity">
                                                <button
                                                    onClick={() => {
                                                        this.updateCart({
                                                            id,
                                                            quantity: 1,
                                                            selectedAttr,
                                                        });
                                                    }}
                                                >
                                                    +
                                                </button>
                                                <p>{quantity}</p>
                                                <button
                                                    onClick={() => {
                                                        quantity > 1
                                                            ? this.updateCart({
                                                                  id,
                                                                  quantity: -1,
                                                                  selectedAttr,
                                                              })
                                                            : this.removeItem({
                                                                  id,
                                                                  selectedAttr,
                                                              });
                                                    }}
                                                >
                                                    -
                                                </button>
                                            </div>
                                            <div className="image">
                                                <img
                                                    src={gallery[0]}
                                                    alt={name}
                                                ></img>
                                                {gallery.length > 1 && (
                                                    <div className="browse">
                                                        <button
                                                            id={id}
                                                            onClick={
                                                                this.changeImage
                                                            }
                                                        >{`<`}</button>
                                                        <button
                                                            id={id}
                                                            onClick={
                                                                this.changeImage
                                                            }
                                                        >{`>`}</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                    </div>
                    <div className="cart-summary">
                        <p>
                            Tax 21%:{' '}
                            <b>
                                {this.props.defaultCurrency?.symbol}{' '}
                                {calcualteTax(
                                    calculateTotal(
                                        this.props.cart,
                                        this.props.defaultCurrency
                                    )
                                )}
                            </b>
                        </p>
                        <p>
                            Quantity:{' '}
                            <b>{calculateQuantity(this.props.cart)}</b>
                        </p>
                        <p>
                            Total:{' '}
                            <b>
                                {this.props.defaultCurrency?.symbol}{' '}
                                {calculateTotal(
                                    this.props.cart,
                                    this.props.defaultCurrency
                                )}
                            </b>
                        </p>
                        <button>Order</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCart: product => {
            dispatch(addToCart(product));
        },
        removeItem: product => {
            dispatch(removeFromCart(product));
        },
    };
};

const mapStateToProps = ({ cart, currencies }) => {
    return {
        cart: cart.cart,
        defaultCurrency: currencies.defaultCurrency,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
