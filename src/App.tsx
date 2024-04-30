import React, { Component } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EstablishmentPage from "./components/EstablishmentPage";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route index element={<HomePage />} />
					<Route path="/establishments/:id" element={<EstablishmentPage />} />
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
