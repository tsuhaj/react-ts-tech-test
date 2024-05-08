import { enableFetchMocks } from "jest-fetch-mock";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { Establishment } from "../../api/ratings/ratingsAPI";
import { BrowserRouter } from "react-router-dom";
import { FC } from "react";
import EstablishmentPage from "./EstablishmentPage";
import fetch from "jest-fetch-mock";

enableFetchMocks();

const MockPage: FC = () => {
	return (
		<BrowserRouter>
			<EstablishmentPage />
		</BrowserRouter>
	);
};

const mockEstablishment: Establishment = {
	AddressLine1: "Line 1",
	AddressLine2: "Line 2",
	AddressLine3: "Line 3",
	AddressLine4: "Line 4",
	RatingValue: "Pass",
	RatingDate: "2019-02-13T00:00:00",
};

describe("Single establishment page", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it("simulates an error in fetching the establishment", async () => {
		const errorMessage = "call failed"
		fetch.mockRejectedValueOnce(new Error(errorMessage));
		render(<MockPage />);

		const errorElement = await screen.findByText(`Error: ${errorMessage}`);

		expect(errorElement).toBeInTheDocument();
	});

	it("display's the loading indicator on initial load", async () => {
		const loadingText = "Loading..."
		fetch.mockResponseOnce(JSON.stringify(mockEstablishment));
		render(<MockPage />);

		await waitForElementToBeRemoved(() => screen.getByText(loadingText));
		expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
	});

	it("checks that the adress is correctly rendered from all lines", async () => {
		fetch.mockResponseOnce(JSON.stringify(mockEstablishment));
		const expectedAddressFormat = "Line 1, Line 2, Line 3, Line 4";

		render(<MockPage />);

		const adressElement = await screen.findByText(expectedAddressFormat);

		expect(adressElement).toBeInTheDocument();
	});

	it("checks that the date of inspection is present and correctly rendered", async () => {
		fetch.mockResponseOnce(JSON.stringify(mockEstablishment));
		const expectedDateFormat = "13/02/19";
		render(<MockPage />);

		const dateElement = await screen.findByText(expectedDateFormat);

		expect(dateElement).toBeInTheDocument();
	});
});
