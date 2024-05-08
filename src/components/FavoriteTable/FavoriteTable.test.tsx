import { enableFetchMocks } from "jest-fetch-mock";
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import { FavoriteTable } from "./FavoriteTable";
import FavoriteProvider, { FavoriteContextType } from "../../context/FavoriteProvider";

enableFetchMocks();

const MockFavoriteTable = () => {
	return (
		<FavoriteProvider favoriteEstIds={["1", "2"]}>
			<FavoriteTable />
		</FavoriteProvider>
	);
};

const mockedData = {
	establishments: [
		{
			BusinessName: "Business 1",
			FHRSID: "1",
			RatingValue: "Rating 1",
		},
		{
			BusinessName: "Business 2",
			FHRSID: "2",
			RatingValue: "Rating 2",
		},
	],
};

describe("Favorites table", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it("check whether error state is properly handled", async () => {
		const errorMessage = "call failed";
		fetch.mockRejectOnce(new Error(errorMessage));

		render(<MockFavoriteTable />);

		const errorElement = await screen.findByText(`Error:${errorMessage}`);

		expect(errorElement).toBeInTheDocument();
	});

	it("check whether loading state is properly handled", async () => {
        const loadingText = "Loading..."
		fetch.mockResponseOnce(JSON.stringify(mockedData));

		render(<MockFavoriteTable />);

		await waitForElementToBeRemoved(() => screen.getByText(loadingText));
		expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
	});

	it("check whether empty state is properly handled", async () => {
        const tableEmptyText = "The table is empty"
		fetch.mockResponseOnce(JSON.stringify({ establishments: [] }));

		render(<MockFavoriteTable />);

		const emptyTableElement = await screen.findByText(tableEmptyText);

		expect(emptyTableElement).toBeInTheDocument();
	});

	it("checks if data is properly shown", async () => {
		fetch.mockResponseOnce(JSON.stringify(mockedData));

		render(<MockFavoriteTable />);

		const favoriteCell = await screen.findByText(mockedData.establishments[0].BusinessName, { selector: "td" });

		expect(favoriteCell).toBeInTheDocument();
	});

	it("checks if removing establishment from favorites table removes it from the context", async () => {
        const removeButtonText = "Remove"
        const loadingText = "Loading..."
		fetch.mockResponse(JSON.stringify(mockedData));
		render(<MockFavoriteTable />);

		await waitForElementToBeRemoved(() => screen.getByText(loadingText));
		const removeButtonsBefore = await screen.findAllByText(removeButtonText);
		expect(removeButtonsBefore.length).toBe(2);

		const firstButton = removeButtonsBefore[0];
		await waitFor(() => {
			fireEvent.click(firstButton);
			expect(screen.getAllByText(removeButtonText).length).toBe(1);
		});
	});
});
