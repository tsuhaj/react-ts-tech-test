import React, { useEffect, useState } from "react";
import { tableRowStyle } from "./EstablishmentsTableRow";
import { EstablishmentRowData, getEstablishmentsByMultipleIds } from "../api/ratingsAPI";
import { useFavorite } from "../context/FavoriteProvider";
import { headerStyle } from "./EstablishmentsTable";
import { tableStyle } from "./PaginatedEstablishmentsTable";

export const FavoriteTable: React.FC = () => {
	const [favoriteEstablishments, setFavoriteEstablishments] = useState<EstablishmentRowData[]>([]);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	const { removeFromFavorites, favoriteEstablishmentIds } = useFavorite();

	const handleRemoveFromFavorites = (id: string) => {
		removeFromFavorites(id);
	};

	//Loads the initial favorites after the page loads
	useEffect(() => {
		if (favoriteEstablishmentIds.length) {
			getEstablishmentsByMultipleIds(favoriteEstablishmentIds)
				.then((data) => {
					setFavoriteEstablishments(data.establishments);
					setError("");
				})
				.catch((error) => setError(error.message))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//This ensures that whenever the user adds or removes new establishments from/to favorites, only the added ones are re-fetched and not the entire table - to save traffic
	useEffect(() => {
		const idsOfAlreadyFetchedFavorites = favoriteEstablishments.map((est) => est.FHRSID);

		//If currently fetched is in sync with the values in context or if the initial load is not finished yet, leave
		if (idsOfAlreadyFetchedFavorites.length === favoriteEstablishmentIds.length || loading) return;

		//Finds newly added ids to favorites and fetches them and appends them to the state
		if (idsOfAlreadyFetchedFavorites.length < favoriteEstablishmentIds.length) {
			const idsToFetch = favoriteEstablishmentIds.filter((item) => !idsOfAlreadyFetchedFavorites.includes(item));
			getEstablishmentsByMultipleIds(idsToFetch)
				.then((data) => {
					setFavoriteEstablishments((oldVals) => [...oldVals, ...data.establishments]);
				})
				.catch((error) => setError(error.message));

			//If the user has deleted any of them just filter the fetched favorite establishments
		} else if (idsOfAlreadyFetchedFavorites.length > favoriteEstablishmentIds.length) {
			const idsToDelete = idsOfAlreadyFetchedFavorites.filter((item) => !favoriteEstablishmentIds.includes(item));

			setFavoriteEstablishments((oldVals) => {
				return oldVals.filter((val) => !idsToDelete.includes(val.FHRSID));
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [favoriteEstablishmentIds]);

	return (
		<table style={tableStyle}>
			<tbody>
				<tr>
					<td style={{ fontWeight: "bold", color: "yellow" }}>Favorite establishments table</td>
				</tr>

				<tr>
					<th style={headerStyle}>Business Name</th>
					<th style={headerStyle}>Rating Value</th>
				</tr>

				{error && (
					<tr>
						<td>Error:{error}</td>
					</tr>
				)}

				{loading ? (
					<tr>
						<td>Loading...</td>
					</tr>
				) : (
					<>
						{favoriteEstablishments.length ? (
							favoriteEstablishments.map((establishment: EstablishmentRowData, index: React.Key | null | undefined) => (
								<tr style={tableRowStyle} key={establishment.FHRSID}>
									<td className="business-name">{establishment.BusinessName}</td>
									<td>{establishment.RatingValue}</td>
									<td>
										<button onClick={() => handleRemoveFromFavorites(establishment.FHRSID)}>Remove</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td>The table is empty</td>
							</tr>
						)}
					</>
				)}
			</tbody>
		</table>
	);
};
