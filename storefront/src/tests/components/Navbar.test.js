import React from "react";
import {render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import Store from "../../store/Store.js";
import {Navbar} from "../../components/Navbar.js";
import { initialState } from "../../setupTests.js"

test("Navbar renders correctly", () => {
    const { undefined, container } = render(
        <Provider store={Store}>
        <Router><Navbar categories={initialState.categories} currencies={initialState.currencies} cart={initialState.cart} defaultCurrency={initialState.currencies[0]} defaultCategory={initialState.categories[0]}/></Router>
        </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText(/all/i)).toBeInTheDocument();
});