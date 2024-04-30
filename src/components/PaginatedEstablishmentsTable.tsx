import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings } from "../api/ratingsAPI";
import { Authority, getAllAuthorities } from "../api/authoritiesAPI";

const tableStyle = {
	background: "#82C7AF",
	padding: "10px",
	width: "max-content",
	marginLeft: "50px",
	color: "white",
};

export const PaginatedEstablishmentsTable = () => {
	const [error, setError] = useState<{ message: string; [key: string]: string }>();
	const [establishments, setEstablishments] = useState<{ [key: string]: string }[]>([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageCount] = useState(100);
	const [loading, setLoading] = useState<boolean>(true);

	const [filteredAuthorityId, setFilteredAuthorityId] = useState<number>(0);
	const [allAuthorities, setAllAuthorities] = useState<Authority | null>(null);

	useEffect(() => {
		getAllAuthorities()
			.then((data) => setAllAuthorities(data))
			.catch((error) => setError(error));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		//Loads initial establishments and also after each filter / page change
		loadData();
	}, [filteredAuthorityId, pageNum]);

	async function handlePreviousPage() {
		pageNum > 1 && setPageNum(pageNum - 1);
		//deleted fetch, it caused desync between rendered pageNum and the actual one sent to the server
	}

	async function handleNextPage() {
		pageNum < pageCount && setPageNum(pageNum + 1);
		//deleted fetch, it caused desync between rendered pageNum and the actual one sent to the server
	}

	const loadData = () => {
		setLoading(true);
		getEstablishmentRatings(pageNum, filteredAuthorityId)
			.then((result) => {
				setEstablishments(result?.establishments || []);
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		return (
			<div style={tableStyle}>
				<h2>Food Hygiene Ratings</h2>
				<div>
					<label htmlFor="filterSelect">Filter by:</label>
					<select id="filterSelect" onChange={(e) => setFilteredAuthorityId(parseInt(e.target.value))}>
						<option value="0">Authority</option>
						{allAuthorities?.authorities.map((item) => (
							<option key={item.LocalAuthorityId} value={item.LocalAuthorityId}>
								{item.Name}
							</option>
						))}
					</select>
				</div>

				<EstablishmentsTable establishments={establishments} loading={loading} />
				<EstablishmentsTableNavigation
					pageNum={pageNum}
					pageCount={pageCount}
					onPreviousPage={handlePreviousPage}
					onNextPage={handleNextPage}
				/>
			</div>
		);
	}
};
