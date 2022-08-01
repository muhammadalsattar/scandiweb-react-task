import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import CartOverlay from "./CartOverlay";
import {setDefaultCategory} from "../actions/categories";
import {setDefaultCurrency} from "../actions/currencies";

export class Navbar extends React.Component {
    componentDidMount() {
        document.addEventListener("click", (e) => {
            if(document.querySelector(".cart-overlay").contains(e.target)){
                document.querySelector(".cart-overlay").removeAttribute("hidden");
                document.querySelector(".page-body").classList.add("faded")
            }
            else if (!e.target.parentNode?.classList.contains("cart-img")) {
                document.querySelector(".cart-overlay").setAttribute("hidden", "true");
                document.querySelector(".page-body").classList.remove("faded")
            }
            else if (!e.target.classList.contains("currency-icon")) {
                document.querySelector(".currency-dropdown").setAttribute("hidden", "true");
                document.querySelector(".currency-drop-icon").style.transform = "rotate(0deg)";
            }

        })
    }
    setDefaultCurrency = (e) => {
        e.preventDefault();
        const currency = this.props.currencies.find(currency => currency.symbol === e.target.value);
        this.props.setDefaultCurrency(currency);
    }
    openCart = () => {
        document.querySelector(".cart-overlay").removeAttribute("hidden");
        document.querySelector(".page-body").classList.add("faded");
    }
    toggleCurrencyDropdown = () => {
        document.querySelector(".currency-dropdown").removeAttribute("hidden");
        document.querySelector(".currency-drop-icon").style.transform = "rotate(180deg)";
    }
    render() {
        return (
            <nav className="navbar">
                <div className="categories">
                    {this.props.categories.map(category => {
                        return(category.name === this.props.defaultCategory.name ? <button key={category.name} className="category active">{category.name}</button> : <button className="category" key={category.name} onClick={()=>{this.props.setDefaultCategory(category)}}>{category.name}</button>)
                    })}
                </div>
                <div className="brand-logo">
                    <Link to="/"><img src={process.env.PUBLIC_URL +'/logo.png'} alt="logo-icon"></img></Link>
                </div>
                <div className="dropdowns">
                    <div className="currency-div">
                        <button onClick={this.toggleCurrencyDropdown} className="currency-icon">{this.props.defaultCurrency.symbol}<span className="currency-drop-icon">&#8743;</span></button>
                        <ul className="currency-dropdown" hidden>
                            {this.props.currencies.map(currency => <li key={currency.symbol}><button value={currency.symbol} onClick={this.setDefaultCurrency}>{currency.symbol} {currency.label}</button></li>)}
                        </ul>
                    </div>
                    <div className="cart-div">
                        <button className="cart-img" onClick={this.openCart}><img src={process.env.PUBLIC_URL+'/cart.png'} alt='cart-img'></img></button>
                        <button className="cart-count">{this.props.cart.length}</button>
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