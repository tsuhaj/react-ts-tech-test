import React from "react";
import { EstablishmentsTableRow } from "../EstablishmentTableRow/EstablishmentsTableRow";
import { EstablishmentRowData } from "../../api/ratings/ratingsAPI";

export const headerStyle: { [key: string]: string | number } = {
	paddingBottom: "10px",
	textAlign: "left",
	fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
	establishments: EstablishmentRowData[];
	loading: boolean;
}> = ({ establishments, loading }) => {
	return (
		<table>
			<tbody>
				<tr>
					<th style={headerStyle}>Business Name</th>
					<th style={headerStyle}>Rating Value</th>
				</tr>

				{loading ? (
					<tr>
						<td>Loading...</td>
					</tr>
				) : establishments.length ? (
					establishments.map((establishment: EstablishmentRowData, index: React.Key | null | undefined) => (
						<EstablishmentsTableRow key={index} establishment={establishment} />
					))
				) : (
					<tr>
						<td>The table is empty</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};
