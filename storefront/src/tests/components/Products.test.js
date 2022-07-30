import React from "react";
import {render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import Store from "../../store/Store.js";
import {Products} from "../../components/Products.js";
import { initialState } from "../../setupTests.js"

test("Products renders correctly", () => {
    const { undefined, container } = render(
        <Provider store={Store}>
        <Router><Products cart={initialState.cart} defaultCurrency={initialState.currencies[0]} products={initialState.products} defaultCategory={initialState.categories[0].name}/></Router>
        </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getAllByText(/out of stock/i)).toHaveLength(5);
});