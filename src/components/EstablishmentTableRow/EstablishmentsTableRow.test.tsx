import { enableFetchMocks } from "jest-fetch-mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { EstablishmentRowData } from "../../api/ratings/ratingsAPI";
import { BrowserRouter } from "react-router-dom";
import { FC } from "react";
import FavoriteProvider from "../../context/FavoriteProvider";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import { mockSetItem } from "../../utils/mockLocalStorage";

enableFetchMocks();

const MockRow: FC<{ data: EstablishmentRowData }> = ({ data }) => {
	return (
		<BrowserRouter>
			<FavoriteProvider>
				<table>
					<tbody>
						<EstablishmentsTableRow establishment={data} />
					</tbody>
				</table>
			</FavoriteProvider>
		</BrowserRouter>
	);
};

const mockedData: EstablishmentRowData = { BusinessName: "Business 1", FHRSID: "ID1", RatingValue: "Rating 1" };

describe("Establishments table row tests", () => {
	beforeEach(() => {
		mockSetItem.mockClear();
	});

	it("shows the table row with actual data and tests localStorage calls via mocked LS object", async () => {
		render(<MockRow data={mockedData} />);

		const tableCell = screen.getByText(mockedData.BusinessName, { selector: "td" });
		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);

		expect(tableCell).toBeInTheDocument();
		expect(mockSetItem).toHaveBeenCalledTimes(2); // Initial context load + event
	});

	it("simulates a click on a table row resulting in a redirect to a single page", async () => {
		render(<MockRow data={mockedData} />);

		const link = screen.getByText(mockedData.BusinessName);
		fireEvent.click(link);

		expect(window.location.pathname).toBe("/establishments/" + mockedData.FHRSID);
	});
});
