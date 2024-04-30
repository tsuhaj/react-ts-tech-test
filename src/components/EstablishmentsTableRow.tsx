import { useNavigate } from "react-router-dom";

const tableRowStyle: { [key: string]: string | number } = {
	fontSize: "20px",
};

export const EstablishmentsTableRow: React.FC<{
	establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
	const navigate = useNavigate();

	return (
		<tr style={tableRowStyle}>
			<td className="business-name" onClick={() => navigate(`/establishments/${establishment?.FHRSID}`)}>
				{establishment?.BusinessName}
			</td>
			<td>{establishment?.RatingValue}</td>
		</tr>
	);
};
