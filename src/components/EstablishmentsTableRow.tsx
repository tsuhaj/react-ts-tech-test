const tableRowStyle: { [key: string]: string | number } = {
	fontSize: "20px",
};

export const EstablishmentsTableRow: React.FC<{
	establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
	return (
		<tr style={tableRowStyle}>
			<td>{establishment?.BusinessName}</td>
			<td>{establishment?.RatingValue}</td>
		</tr>
	);
};
