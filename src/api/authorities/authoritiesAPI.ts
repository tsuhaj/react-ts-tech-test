import { API_GLOBAL_URL, headerOpts } from "../config";

const PATH = "Authorities";

export interface Authority {
	authorities: {
		Name: string;
		LocalAuthorityId: number;
	}[];
}

const fetchAuthorities = async <T>(url: string): Promise<T> => {
	const response = await fetch(url, headerOpts);
	if (!response.ok) {
		throw new Error(`Request failed with code ${response.status}`);
	}
	return response.json();
};

export const getAllAuthorities = async (): Promise<Authority> => {
	const url = `${API_GLOBAL_URL}/${PATH}`;
	return fetchAuthorities<Authority>(url);
};
