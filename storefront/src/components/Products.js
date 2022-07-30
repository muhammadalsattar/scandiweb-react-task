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

    const product = this.props.products.find(product => product.id === e.target.id);
    const selectedAttr = product.attributes.map(attribute => {
      return {
        name: attribute.name,
        value: attribute.items[0].value
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
    this.props.setLoadedProducts(this.props.loadedProducts, this.props.allProducts.length);
  }
  
  render() {
    return (
      <div className="products-page">
        <Navbar />
        <div className="products page-body">
          <h1 className="category-name">{this.props.defaultCategory}</h1>
          <div className="products-list">
            {this.props.products.map(product =>
              (
              <div className={"product-item " + product.inStock} key={product.id}>
                {product.inStock && <h2 className="out-stock">out of stock</h2>}
                <div className="product-image">
                  <Link to={`/product?id=${product.id}`} ><img src={product.gallery[0]} alt={product.name}></img></Link>
                </div>
                <div className="product-info">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">{this.props.defaultCurrency.symbol}{pickPrice(product.prices, this.props.defaultCurrency)}</p>
                </div>
                <button className="bag-button"><img id={product.id} onClick={this.updateCart} src={process.env.PUBLIC_URL+"/circle-icon.png"} alt="cart-circle"></img></button>
              </div>
              )
            )}
          </div>
        </div>
        <button className="load-more" onClick={this.loadMore}>Load More</button>
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

const mapStateToProps = state => {
  return {
    products: state.categories.defaultCategory.name === "all"?
    state.products.products.slice(0, state.products.loadedProducts).map(product => {
      return product;
    }):
    state.products.products.slice(0, state.products.loadedProducts).filter(product=>product.category === state.categories.defaultCategory.name).map(product => {
      return product;
    }),
    allProducts: state.products.products,
    loadedProducts: state.products.loadedProducts,
    defaultCategory: state.categories.defaultCategory.name,
    cart: state.cart.cart,
    defaultCurrency: state.currencies.defaultCurrency
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);