import React from "react";
import { connect } from "react-redux";


class Product extends React.Component {
  render() {
    return (
      <div className="product">
        <div className="product-gallery">
          {
            this.props.product?.gallery.map((image, index) => {
              return (
                <img key={index} src={image} alt={this.props.product.name} style={{width: 50}}/>
              )
            })
          }
        </div>
        <div className="product-info">
          <h2>{this.props.product?.brand}</h2>
          <h3>{this.props.product?.name}</h3>
        </div>
        <div className="product-attributes">
          {
            this.props.product?.attributes.map((attribute, index) => {
              return(
                <div className="product-attribute" key={index}>
                  <h4>{attribute.name}</h4>
                    {
                      attribute.items.map((item, index) => {
                        return (<button key={item.id}>{item.value}</button>)
                      })
                    }
                </div>
            )})
          }
        </div>
        <div className="product-price">
          <h4>Price:</h4>
          {this.props.product?.prices.find((price) => price.currency.symbol === this.props.defaultCurrency.symbol)?.currency.symbol}
          {this.props.product?.prices.find((price) => price.currency.symbol === this.props.defaultCurrency.symbol)?.amount}
        </div>
        <button>Add to Cart</button>
        <div className="product-description">
          <p>{new DOMParser().parseFromString(this.props.product?.description, "text/html").body.textContent}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.products.find(product => product.id === new URLSearchParams(window.location.search).get("id")),
    defaultCurrency: state.currencies.defaultCurrency
  }
}

export default connect(mapStateToProps)(Product);