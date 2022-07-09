import React from "react";
import Navbar from "./Navbar";
import Product from "./Product";

class ProductPage extends React.Component {
  render() {
    return (
        <>
        <Navbar/>
        <Product/>
        </>
    );
  }
}

export default ProductPage;