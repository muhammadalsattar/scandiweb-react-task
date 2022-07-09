import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import CartOverlay from "./CartOverlay";
import {setDefaultCategory} from "../actions/categories";
import {setDefaultCurrency} from "../actions/currencies";

class Navbar extends React.Component {
    setDefaultCurrency = (e) => {
        e.preventDefault();
        const currency = this.props.currencies.find(currency => currency.symbol === e.target.value);
        this.props.setDefaultCurrency(currency);
    }
    toggleCart = () => {
        document.querySelector(".cart-overlay").toggleAttribute("hidden");
    }
    render() {
        return (
            <nav className="navbar">
                <div className="categories">
                    {this.props.categories.map(category => {
                        return(
                            category.name === this.props.defaultCategory.name ? <button key={category.name} className="category active">{category.name}</button> : <button className="category" key={category.name} onClick={()=>{this.props.setDefaultCategory(category)}}>{category.name}</button>
                        )
                    }
                    )}
                </div>
                <div className="brand-logo">
                    <Link to="/"><h3>logo</h3></Link>
                </div>
                <div className="dropdowns">
                    <div className="currency">
                        <select onChange={this.setDefaultCurrency}>
                            {this.props.currencies.map(currency => {
                                return <option key={currency.symbol} value={currency.symbol}>{currency.symbol} {currency.label}</option>
                            })}
                        </select>
                    </div>
                    <div className="cart">
                        <button onClick={this.toggleCart}>Cart</button>
                        <CartOverlay/>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDefaultCategory: (category) => {
            dispatch(setDefaultCategory(category));
        },
        setDefaultCurrency: (currency) => {
            dispatch(setDefaultCurrency(currency));
        }
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
        currencies: state.currencies.currencies,
        defaultCategory: state.categories.defaultCategory,
        defaultCurrency: state.currencies.defaultCurrency,
        cart: state.cart.cart,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);