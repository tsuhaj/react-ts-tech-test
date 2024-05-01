import { useNavigate } from "react-router-dom";
import { useFavorite } from "../context/FavoriteProvider";
import { EstablishmentRowData } from "../api/ratingsAPI";

export const tableRowStyle: { [key: string]: string | number } = {
	fontSize: "20px",
};

export const EstablishmentsTableRow: React.FC<{
	establishment: EstablishmentRowData;
}> = ({ establishment }) => {
	const navigate = useNavigate();

	const { addToFavorites, favoriteEstablishmentIds, removeFromFavorites } = useFavorite();

	const isChecked = favoriteEstablishmentIds.includes(establishment.FHRSID);

	const handleCheck = () => {
		if (isChecked) removeFromFavorites(establishment.FHRSID);
		else addToFavorites(establishment.FHRSID);
	};

	return (
		<tr style={tableRowStyle}>
			<td className="business-name" onClick={() => navigate(`/establishments/${establishment.FHRSID}`)}>
				{establishment.BusinessName}
			</td>
			<td>{establishment.RatingValue}</td>
			<td>
				<input type="checkbox" checked={isChecked} onChange={handleCheck} />
			</td>
		</tr>
	);
};
