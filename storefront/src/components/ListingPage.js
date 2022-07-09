import React from "react";
import Navbar from "./Navbar";
import Products from "./Products";
class ListingPage extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <Products />
            </>
        );
    }
}

export default ListingPage;