import { enableFetchMocks } from "jest-fetch-mock";
import fetch from "jest-fetch-mock";
import { Authority, getAllAuthorities } from "./authoritiesAPI";
import { API_GLOBAL_URL, headerOpts } from "../config";

enableFetchMocks();

export const expectedResponseAll: Authority = {
	authorities: [
		{
			LocalAuthorityId: 1,
			Name: "Authority 1",
		},
		{
			LocalAuthorityId: 2,
			Name: "Authority 2",
		},
	],
};

describe("Authorities API", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it("calls the authorities endpoint to get all results", async () => {
		fetch.mockResponseOnce(JSON.stringify(expectedResponseAll));

		const actualResponse = await getAllAuthorities();

		expect(actualResponse).toEqual(expectedResponseAll);
		expect(actualResponse.authorities.length).toBeGreaterThan(0);
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(`${API_GLOBAL_URL}/Authorities`, headerOpts);
	});
});
