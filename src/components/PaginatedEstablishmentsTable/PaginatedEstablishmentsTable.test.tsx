import { enableFetchMocks } from "jest-fetch-mock";
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import { expectedResponseAll } from "../../api/authorities/authoritiesAPI.test";

enableFetchMocks();

describe("Establishment table wrapper tests", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it("check whether error state is properly handled", async () => {
        const errorMessage = "call failed"
        const loadingText = "Loading..."
		fetch.mockRejectedValue(new Error(errorMessage));

		render(<PaginatedEstablishmentsTable />);

		await waitForElementToBeRemoved(() => screen.getByText(loadingText));
		const errorElement = await screen.findByText(`Error: ${errorMessage}`);

		expect(errorElement).toBeInTheDocument();
	});

	it("display's authorities from API and allows selection", async () => {
        const loadingText = "Loading..."
        const filterTestId = "filter"
		fetch.mockResponse(JSON.stringify(expectedResponseAll));
		render(<PaginatedEstablishmentsTable />);

		const value = "1";

		await waitForElementToBeRemoved(() => screen.getByText(loadingText));
		const selectElement = await screen.findByTestId(filterTestId);

		fireEvent.change(selectElement, { target: { value } });
		await waitForElementToBeRemoved(() => screen.getByText(loadingText));
		expect(selectElement).toHaveValue(value);
	});

});
