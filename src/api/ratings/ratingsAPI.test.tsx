import { enableFetchMocks } from "jest-fetch-mock";
import { EstablishmentsType, getEstablishmentById, getEstablishmentRatings } from "./ratingsAPI";
import fetch from "jest-fetch-mock";
import { API_GLOBAL_URL, headerOpts } from "../config";

enableFetchMocks();

export const expectedResponseAll: EstablishmentsType = {
	establishments: [
		{
			FHRSID: "1549111",
			BusinessName: "' THE ARGENTINIAN ''",
			RatingValue: "2",
		},
		{
			FHRSID: "1466637",
			BusinessName: "!NOSH!",
			RatingValue: "Pass",
		},
	],
	meta: {
		dataSource: "API",
		extractDate: "2024-05-07T14:58:38.519297+01:00",
		itemCount: 10,
		returncode: "OK",
		totalCount: 594338,
		totalPages: 59434,
		pageSize: 10,
		pageNumber: 1,
	},
	links: [
		{
			rel: "self",
			href: "http://api.ratings.food.gov.uk/establishments/basic/1/10",
		},
		{
			rel: "first",
			href: "http://api.ratings.food.gov.uk/establishments/basic/1/10",
		},
		{
			rel: "previous",
			href: "http://api.ratings.food.gov.uk/establishments/basic/1/10",
		},
		{
			rel: "next",
			href: "http://api.ratings.food.gov.uk/establishments/basic/2/10",
		},
		{
			rel: "last",
			href: "http://api.ratings.food.gov.uk/establishments/basic/59434/10",
		},
	],
};

describe("Ratings API", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it("call the ratings api with the provided page number", async () => {
		const pageNum = 1;
		const pageSize = 10;
		fetch.mockResponseOnce(JSON.stringify(expectedResponseAll));

		const actualResponse: EstablishmentsType = await getEstablishmentRatings(pageNum);

		expect(actualResponse).toEqual(expectedResponseAll);
		expect(actualResponse.meta.pageSize).toEqual(10);
		expect(actualResponse.establishments.length).toBeGreaterThan(0);
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(`${API_GLOBAL_URL}/Establishments/basic/${pageNum}/${pageSize}`, headerOpts);
	});

	it("simulates a failed fetch of a getEstablishmentById call", async () => {
		const expectedError = new Error("Request failed with code X");
		const establishmentId = "1";
		fetch.mockRejectOnce(expectedError);

		let actualResponse: any = null;
		try {
			actualResponse = await getEstablishmentById(establishmentId);
		} catch (error) {
			actualResponse = error;
		}

		expect(actualResponse).toEqual(expectedError);
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(`${API_GLOBAL_URL}/Establishments/${establishmentId}`, headerOpts);
	});

});
