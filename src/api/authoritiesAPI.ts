export interface Authority {
	authorities: {
		Name: string;
		LocalAuthorityId: number;
		//We dont need other attributes
	}[];
}

export const getAllAuthorities = async (): Promise<Authority> => {
	return fetch("http://api.ratings.food.gov.uk/Authorities", { headers: { "x-api-version": "2" } }).then((res) => res.json());
};
