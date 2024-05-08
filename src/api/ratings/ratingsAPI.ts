import { API_GLOBAL_URL, headerOpts } from "../config";

const PATH = "Establishments";

export type EstablishmentsType = {
	establishments: EstablishmentRowData[];
	meta: MetaData;
	links: Link[];
};

export interface MetaData {
	dataSource: string;
	extractDate: string;
	itemCount: number;
	returncode: string;
	totalCount: number;
	totalPages: number;
	pageSize: number;
	pageNumber: number;
}

export interface Link {
	rel: string;
	href: string;
}

//Used for table row
export interface EstablishmentRowData {
	BusinessName: string;
	FHRSID: string;
	RatingValue: string;
}

//Used for single establishment page
export interface Establishment {
	AddressLine1: string;
	AddressLine2: string;
	AddressLine3: string;
	AddressLine4: string;
	RatingValue: string;
	RatingDate: string;
}

const fetchEstablishments = async <T>(url: string): Promise<T> => {
	const response = await fetch(url, headerOpts);
	if (!response.ok) {
		throw new Error(`Request failed with code ${response.status}`);
	}
	return response.json();
};

export const getEstablishmentRatings = async (pageNum: number, localAuthorityId?: number): Promise<EstablishmentsType> => {
	const endpoint = localAuthorityId
		? `${PATH}?pageNumber=${pageNum}&pageSize=10&localAuthorityId=${localAuthorityId}`
		: `${PATH}/basic/${pageNum}/10`;

	const url = `${API_GLOBAL_URL}/${endpoint}`;
	return fetchEstablishments<EstablishmentsType>(url);
};

export const getEstablishmentById = async (id: string): Promise<Establishment> => {
	const url = `${API_GLOBAL_URL}/${PATH}/${id}`;
	return fetchEstablishments<Establishment>(url);
};

const buildQueryFromIds = (ids: string[]): string => {
	return ids.map((id) => `id=${id}`).join("&");
};

export const getEstablishmentsByMultipleIds = async (ids: string[]): Promise<EstablishmentsType> => {
	const query = buildQueryFromIds(ids);
	const url = `${API_GLOBAL_URL}/${PATH}/list?${query}`;
	return fetchEstablishments<EstablishmentsType>(url);
};
