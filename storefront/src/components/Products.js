import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart, updateCartItem } from "../actions/cart";
import { setActiveProduct } from "../actions/products";
import pickPrice from "../utils/pickPrice";

class Products extends React.Component {

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
    if(this.props.cart.find(cartProduct => cartProduct.id === newProduct.id)) {
      this.props.updateCartItem(newProduct);
    }
    else {
      this.props.addToCart(newProduct);
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.defaultCategory}</h1>
        <div className="products">
          {this.props.products.map(product => {
            return (
                <div className="product" key={product.id}>
                  <div className="product-image">
                    <Link to={`/product?id=${product.id}`} ><img src={product.gallery[0]} alt={product.name} style={{width: 150}}></img></Link>
                  </div>
                  {product.inStock && <p>Available</p>}
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    {new DOMParser().parseFromString(product.description, "text/html").body.textContent}
                    <p>{this.props.defaultCurrency.symbol} {pickPrice(product.prices, this.props.defaultCurrency)}</p>
                  </div>
                  <button id={product.id} onClick={this.updateCart}>Add to bag</button>
                </div>
              );
            })}
        </div>
      </div>);
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
    updateCartItem: (product) => {
      dispatch(updateCartItem(product));
    }
  };
};

const mapStateToProps = state => {
  return {
    products: state.categories.defaultCategory.name === "all"?
    state.products.products.map(product => {
      return product;
    }):
    state.products.products.filter(product=>product.category === state.categories.defaultCategory.name).map(product => {
      return product;
    }),
    defaultCategory: state.categories.defaultCategory.name,
    cart: state.cart.cart,
    defaultCurrency: state.currencies.defaultCurrency
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);