import { enableFetchMocks } from "jest-fetch-mock";
import { render, screen, waitFor } from "@testing-library/react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentRowData } from "../../api/ratings/ratingsAPI";
import { BrowserRouter } from "react-router-dom";
import { FC } from "react";
import FavoriteProvider from "../../context/FavoriteProvider";

enableFetchMocks();

const MockTable: FC<{ data: EstablishmentRowData[]; loading: boolean }> = ({ data, loading }) => {
	return (
		<BrowserRouter>
			<FavoriteProvider>
				<EstablishmentsTable establishments={data} loading={loading} />
			</FavoriteProvider>
		</BrowserRouter>
	);
};

describe("Establishment table tests", () => {
	it("shows the table with actual data", async () => {
		const mockedData: EstablishmentRowData[] = [
			{ BusinessName: "Business 1", FHRSID: "ID 1", RatingValue: "Rating 1" },
			{ BusinessName: "Business 2", FHRSID: "ID 2", RatingValue: "Rating 2" },
		];
		render(<MockTable data={mockedData} loading={false} />);

		const loadingCell = screen.getByText(mockedData[0].BusinessName, { selector: "td" });

		expect(loadingCell).toBeInTheDocument();
	});

	it("display's the loading indicator on initial load", async () => {
		const loadingText = "Loading..."
		render(<EstablishmentsTable establishments={[]} loading={true} />);

		const loadingCell = screen.getByText(loadingText, { selector: "td" });

		expect(loadingCell).toBeInTheDocument();
	});

	it("show's that the table is empty", async () => {
		const tableEmptyText = "The table is empty"
		render(<EstablishmentsTable establishments={[]} loading={false} />);

		const loadingCell = screen.getByText(tableEmptyText, { selector: "td" });

		expect(loadingCell).toBeInTheDocument();
	});
});
