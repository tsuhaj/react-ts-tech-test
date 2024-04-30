export type EstablishmentsType = {
	establishments: {}[];
	meta: {
		dataSource: string;
		extractDate: string;
		itemCount: number;
		returncode: string;
		totalCount: number;
		totalPages: number;
		pageSize: number;
		pageNumber: number;
	};
	links: [
		{
			rel: string;
			href: string;
		}
	];
};

export interface Establishment {
	AddressLine1: string;
	AddressLine2: string;
	AddressLine3: string;
	AddressLine4: string;
	RatingValue: string;
	RatingDate: string;
}

export const getEstablishmentRatings = async (pageNum: number, localAuthorityId: number): Promise<EstablishmentsType> => {
	//Implemented URL switching based on the input params, because the filterable endpoint doesn't run with just pageNumber and pageSize
	const URL = localAuthorityId
		? `http://api.ratings.food.gov.uk/Establishments?pageNumber=${pageNum}&pageSize=10&localAuthorityId=${localAuthorityId}`
		: `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`;

	return fetch(URL, { headers: { "x-api-version": "2" } }).then((res) => {
		if (!res.ok) throw new Error("Request failed with code " + res.status);
		return res.json();
	});
};

export const getEstablishmentById = async (id: string): Promise<Establishment> => {
	return fetch(`http://api.ratings.food.gov.uk/Establishments/${id}`, { headers: { "x-api-version": "2" } }).then((res) => {
		if (!res.ok) throw new Error("Request failed with code " + res.status);
		return res.json();
	});
};
