import React from "react";
import {render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import Store from "../../store/Store.js";
import {CartOverlay} from "../../components/Cartoverlay.js";
import { initialState } from "../../setupTests.js"

test("Cartoverlay renders correctly", () => {
    const { undefined, container } = render(
        <Provider store={Store}>
        <Router><CartOverlay cart={initialState.cart} defaultCurrency={initialState.currencies[0]}/></Router>
        </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText(/1178.01/i)).toBeInTheDocument();
    expect(screen.getByText(/View Bag/i)).toBeInTheDocument();
});