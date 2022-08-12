import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { addToCart } from "../actions/cart";
import { setActiveProduct, setLoadedProducts } from "../actions/products";
import {pickPrice} from "../utils/utils";

export class Products extends React.Component {
  updateCart = e => {
    e.preventDefault();

    const product = this.props.products.find(({id}) => id === e.target.id);
    const selectedAttr = product.attributes.map(({name, items}) => {
      return {
        name,
        value: items[0].value
      };
    });
    const newProduct = {...product, selectedAttr, quantity: 1};
    this.props.addToCart(newProduct);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    document.querySelector(".cart-overlay").removeAttribute("hidden");
    document.querySelector(".page-body").classList.add("faded")
  }

  loadMore = e => {
    e.preventDefault();
    this.props.setLoadedProducts(this.props.loadedProducts, this.props.allProducts);
  }
  
  render() {
    return (
      <div className="products-page">
        <Navbar />
        <div className="products page-body">
          <h1 className="category-name">{this.props.defaultCategory}</h1>
          <div className="products-list">
            {this.props.products.map(({id, name, brand, inStock, gallery, prices}) =>
              (
              <div className={"product-item " + inStock} key={id}>
                {!inStock && <h2 className="out-stock">out of stock</h2>}
                <div className="product-image">
                  <Link to={`/product?id=${id}`} ><img src={gallery[0]} alt={name}></img></Link>
                </div>
                <div className="product-info">
                  <p className="product-name">{name}</p>
                  <p className="product-price">{this.props.defaultCurrency.symbol}{pickPrice(prices, this.props.defaultCurrency)}</p>
                  {inStock && <button className="bag-button"><img id={id} onClick={this.updateCart} src={process.env.PUBLIC_URL+"/circle-icon.png"} alt="cart-circle"></img></button>}
                </div>
              </div>
              )
            )}
          </div>
          <div className="load-more">
            { this.props.allProducts > this.props.loadedProducts && <button onClick={this.loadMore}>Load More</button>}
          </div>
        </div>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => {
      dispatch(addToCart(product));
    },
    setActiveProduct: productID => {
      dispatch(setActiveProduct(productID));
    },
    setLoadedProducts: (loadedProducts, productsLength) => {
      if(loadedProducts + 5 > productsLength) {
        dispatch(setLoadedProducts(productsLength));
      } else {
        dispatch(setLoadedProducts(loadedProducts + 5));
      }
    }
  };
};

const mapStateToProps = ({categories: {defaultCategory}, products, cart: {cart}, currencies: {defaultCurrency}}) => {
  return {
    products: defaultCategory.name === "all"?
    products.products.slice(0, products.loadedProducts).map(product => {
      return product;
    }):
    products.products.filter(product=>product.category === defaultCategory.name).slice(0, products.loadedProducts).map(product => {
      return product;
    }),
    allProducts: defaultCategory.name !== "all" ? products.products.filter(product=>product.category === defaultCategory.name).length : products.products.length,
    loadedProducts: products.loadedProducts,
    defaultCategory: defaultCategory.name,
    cart,
    defaultCurrency
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);