import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings } from "../api/ratingsAPI";

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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getEstablishmentRatings(pageNum).then(
			(result) => {
				setEstablishments(result?.establishments);
				setLoading(false);
			},
			(error) => {
				setError(error);
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function handlePreviousPage() {
		pageNum > 1 && setPageNum(pageNum - 1);
		setLoading(true);
		getEstablishmentRatings(pageNum).then(
			(result) => {
				setEstablishments(result.establishments);
				setLoading(false);
			},
			(error) => {
				setError(error);
			}
		);
	}

	async function handleNextPage() {
		pageNum < pageCount && setPageNum(pageNum + 1);
		setLoading(true);
		getEstablishmentRatings(pageNum).then(
			(result) => {
				setEstablishments(result.establishments);
				setLoading(false);
			},
			(error) => {
				setError(error);
			}
		);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		return (
			<div style={tableStyle}>
				<h2>Food Hygiene Ratings</h2>
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
