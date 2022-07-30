import React from "react";
import {render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import Store from "../../store/Store.js";
import {Cart} from "../../components/Cart.js";
import { initialState } from "../../setupTests.js"

test("Cart renders correctly", () => {
    const { undefined, container } = render(
        <Provider store={Store}>
        <Router><Cart cart={initialState.cart} defaultCurrency={initialState.currencies[0]}/></Router>
        </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText(/1178.01/i)).toBeInTheDocument();
});