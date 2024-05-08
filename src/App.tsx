import { Component } from "react";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EstablishmentPage from "./components/EstablishmentPage/EstablishmentPage";
import FavoriteProvider from "./context/FavoriteProvider";
import LayoutLayer from "./components/LayoutLayer/LayoutLayer";

class App extends Component {
	render() {
		return (
			<FavoriteProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<LayoutLayer />}>
							<Route index element={<HomePage />} />
							<Route path="/establishments/:id" element={<EstablishmentPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</FavoriteProvider>
		);
	}
}

export default App;
