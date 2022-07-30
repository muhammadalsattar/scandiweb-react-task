import React from "react";
import {render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import Store from "../../store/Store.js";
import {Product} from "../../components/Product.js";
import { initialState } from "../../setupTests.js"

test("Product renders correctly", () => {
    const { undefined, container } = render(
        <Provider store={Store}>
        <Router><Product cart={initialState.cart} defaultCurrency={initialState.currencies[0]} product={initialState.products[0]}/></Router>
        </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText(/Nike x Stussy/i)).toBeInTheDocument();
    expect(screen.getAllByAltText(/Nike Air Huarache Le/i)).toHaveLength(6);
});