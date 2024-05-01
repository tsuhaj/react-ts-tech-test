import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import { EstablishmentRowData } from "../api/ratingsAPI";

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
				) : (
					establishments &&
					establishments?.map((establishment: EstablishmentRowData, index: React.Key | null | undefined) => (
						<EstablishmentsTableRow key={index} establishment={establishment} />
					))
				)}
			</tbody>
		</table>
	);
};
