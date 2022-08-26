import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartOverlay from './CartOverlay';
import { setProducts } from '../actions/products';
import { setDefaultCategory } from '../actions/categories';
import { setDefaultCurrency } from '../actions/currencies';
import { getProductsByCategory } from '../apollo/requests';
import { calculateQuantity } from '../utils/utils';

export class Navbar extends React.Component {
    componentDidMount() {
        document.addEventListener('click', e => {
            // Handle cart overlay visibility based on user interaction
            if (!document.querySelector('.cart-div').contains(e.target)) {
                document
                    .querySelector('.cart-overlay')
                    .setAttribute('hidden', 'true');
                document.querySelector('.page-body').classList.remove('faded');
            }
            // Handle currency dropdown visibility based on user interaction
            if (!document.querySelector('.currency-div').contains(e.target)) {
                document
                    .querySelector('.currency-dropdown')
                    .setAttribute('hidden', 'true');
                document.querySelector('.currency-drop-icon').style.transform =
                    'rotate(0deg)';
            }
        });
    }
    setDefaultCurrency = e => {
        e.preventDefault();
        const currency = this.props.currencies.find(
            currency => currency.symbol === e.target.value
        );
        this.props.setDefaultCurrency(currency);
        document
            .querySelector('.currency-dropdown')
            .setAttribute('hidden', 'true');
        document.querySelector('.currency-drop-icon').style.transform =
            'rotate(0deg)';
    };
    openCart = () => {
        document.querySelector('.cart-overlay').removeAttribute('hidden');
        document.querySelector('.page-body').classList.add('faded');
    };
    openCurrencyDropdown = () => {
        document.querySelector('.currency-dropdown').removeAttribute('hidden');
        document.querySelector('.currency-drop-icon').style.transform =
            'rotate(180deg)';
    };
    setDefaultCategory = category => {
        return () => {
            this.props.setDefaultCategory(category);
            this.props.setProducts(category.name);
        };
    };
    render() {
        return (
            <nav className="navbar">
                <div className="categories">
                    {this.props.categories.map(({ name }) => {
                        return name === this.props.defaultCategory.name ? (
                            <button key={name} className="category active">
                                <Link to="/">{name}</Link>
                            </button>
                        ) : (
                            <button
                                className="category"
                                key={name}
                                onClick={this.setDefaultCategory({ name })}
                            >
                                <Link to="/">{name}</Link>
                            </button>
                        );
                    })}
                </div>
                <div className="brand-logo">
                    <Link to="/">
                        <img
                            src={process.env.PUBLIC_URL + '/logo.png'}
                            alt="logo-icon"
                        ></img>
                    </Link>
                </div>
                <div className="dropdowns">
                    <div className="currency-div">
                        <button
                            onClick={this.openCurrencyDropdown}
                            className="currency-icon"
                        >
                            {this.props.defaultCurrency.symbol}
                            <span className="currency-drop-icon">&#8743;</span>
                        </button>
                        <ul className="currency-dropdown" hidden>
                            {this.props.currencies.map(({ symbol, label }) => (
                                <li key={symbol}>
                                    <button
                                        value={symbol}
                                        onClick={this.setDefaultCurrency}
                                    >
                                        {symbol} {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="cart-div">
                        <button className="cart-img" onClick={this.openCart}>
                            <img
                                src={process.env.PUBLIC_URL + '/cart.png'}
                                alt="cart-img"
                            ></img>
                        </button>
                        <button className="cart-count">
                            {calculateQuantity(this.props.cart)}
                        </button>
                        <CartOverlay />
                    </div>
                </div>
            </nav>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDefaultCategory: category => {
            dispatch(setDefaultCategory(category));
        },
        setDefaultCurrency: currency => {
            dispatch(setDefaultCurrency(currency));
        },
        setProducts: async categoryName => {
            const products = await getProductsByCategory(categoryName);
            dispatch(setProducts(products));
        },
    };
};

const mapStateToProps = ({ categories, currencies, cart }) => {
    return {
        categories: categories.categories,
        currencies: currencies.currencies,
        defaultCategory: categories.defaultCategory,
        defaultCurrency: currencies.defaultCurrency,
        cart: cart.cart,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
