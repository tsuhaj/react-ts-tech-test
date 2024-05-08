import { useState, useEffect } from "react";
import { EstablishmentsTable } from "../EstablishmentTable/EstablishmentsTable";
import { EstablishmentsTableNavigation } from "../EstablishmentsTableNavigation/EstablishmentsTableNavigation";
import { EstablishmentRowData, getEstablishmentRatings } from "../../api/ratings/ratingsAPI";
import { Authority, getAllAuthorities } from "../../api/authorities/authoritiesAPI";

export const tableStyle = {
	background: "#82C7AF",
	padding: "10px",
	width: "max-content",
	marginLeft: "50px",
	color: "white",
};

export const PaginatedEstablishmentsTable = () => {
	const [error, setError] = useState<{ message: string; [key: string]: string }>();
	const [establishments, setEstablishments] = useState<EstablishmentRowData[]>([]);
	const [pageNum, setPageNum] = useState(1);
	const [pageCount] = useState(100);
	const [loading, setLoading] = useState<boolean>(false);

	const [filteredAuthorityId, setFilteredAuthorityId] = useState<number>(0);
	const [allAuthorities, setAllAuthorities] = useState<Authority | null>(null);

	useEffect(() => {
		getAllAuthorities()
			.then((data) => setAllAuthorities(data))
			.catch((error) => setError(error.message));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		//Loads initial establishments and also after each filter / page change
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filteredAuthorityId, pageNum]);

	async function handlePreviousPage() {
		pageNum > 1 && setPageNum(pageNum - 1);
	}

	async function handleNextPage() {
		pageNum < pageCount && setPageNum(pageNum + 1);
	}

	const loadData = () => {
		setLoading(true);
		getEstablishmentRatings(pageNum, filteredAuthorityId)
			.then((result) => {
				setEstablishments(result?.establishments || []);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (error) {
		return <div>Error: {error}</div>;
	} else {
		return (
			<div style={tableStyle}>
				<h2>Food Hygiene Ratings</h2>
				<div>
					<label htmlFor="filterSelect">Filter by:</label>
					<select data-testid="filter" id="filterSelect" onChange={(e) => setFilteredAuthorityId(parseInt(e.target.value))}>
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
