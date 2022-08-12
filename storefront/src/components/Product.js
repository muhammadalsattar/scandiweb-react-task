import React from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import {addToCart} from "../actions/cart";


export class Product extends React.Component {

  changeFocuesdImage = (e) => {
    const src = e.target.src;
    document.querySelector(".image-focused img").src = src;
  }

  changeActiveAttr = (e) => {
    e.preventDefault();
    document.querySelector(`.${e.target.parentNode.className}#selected`).removeAttribute("id");
    e.target.parentNode.setAttribute("id", "selected");
  }

  addToCart = (product) => {
    let selectedAttr = [];
    document.querySelectorAll(".product-attribute-values div#selected").forEach((node)=>{
      selectedAttr.push({
        name: node.className,
        value: node.children[0].id
      })
    })
    const newProduct = {...product, selectedAttr, quantity: 1}
    this.props.addToCart(newProduct)

    document.querySelector(".cart-overlay").removeAttribute("hidden");
    document.querySelector(".page-body").classList.toggle("faded")
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  render() {
    return (
      <div className="product-page">
        <Navbar />
        <div className="product page-body">
          <div className="product-gallery">
            <div className="product-gallery-images">
              {this.props.product?.gallery.map((image) => (<img key={image} src={image} onClick={this.changeFocuesdImage} alt={this.props.product.name}/>))}
            </div>
            <div className="image-focused"><img src={this.props.product?.gallery[0]} alt={this.props.product?.name}></img></div>
          </div>
          <div className="product-info">
            <h1 className="product-brand">{this.props.product?.brand}</h1>
            <h1 className="product-name">{this.props.product?.name}</h1>
            <div className="product-attributes">
            {
            this.props.product?.attributes.map(({id, name, items}) =>
              (
              <div className="product-attribute" key={name}>
                <h4>{name}:</h4>
                <div className="product-attribute-values">
                {
                  items.map((item, index) =>
                    name === "Color"?
                      index === 0?
                        <div key={item.id} id="selected" className={id.replaceAll(' ', '-')}><button id={item.value} onClick={this.changeActiveAttr} style={{backgroundColor: item.value}}/></div>:
                        <div key={item.id} className={id.replaceAll(' ', '-')}><button id={item.value} onClick={this.changeActiveAttr} style={{backgroundColor: item.value}}/></div>
                      :
                      index === 0?
                      <div key={item.id} id="selected" className={id.replaceAll(' ', '-')}><button id={item.value} onClick={this.changeActiveAttr}>{item.value}</button></div>: 
                      <div key={item.id} className={id.replaceAll(' ', '-')}><button id={item.value} onClick={this.changeActiveAttr}>{item.value}</button></div>
                  )
                }
                </div>
              </div>
              )
            )}
            </div>
            <div className="product-price">
              <h4>Price:</h4>
              <h4 className="price">
              {this.props.product?.prices.find(({currency: {symbol}}) => symbol === this.props.defaultCurrency.symbol)?.currency.symbol}
              {this.props.product?.prices.find(({currency: {symbol}}) => symbol === this.props.defaultCurrency.symbol)?.amount}
              </h4>
            </div>
            <button className="cart" disabled={!this.props.product?.inStock} onClick={(e)=>{this.addToCart(this.props.product)}}>Add to Cart</button>
            <div className="product-description">
              <p>{new DOMParser().parseFromString(this.props.product?.description, "text/html").body.textContent}</p>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => dispatch(addToCart(product))
  }
}

const mapStateToProps = ({products, currencies, cart}) => {
  return {
    product: products.products.find(product => product.id === new URLSearchParams(window.location.search).get("id")),
    defaultCurrency: currencies.defaultCurrency,
    cart: cart.cart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);