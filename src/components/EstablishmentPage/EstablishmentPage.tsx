import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Establishment, getEstablishmentById } from "../../api/ratings/ratingsAPI";

const buildAddressFromArray = (addressLines: string[]): string => {
	return addressLines.filter((line) => line.trim() !== "").join(", ");
};

//Represents dd/mm/yy format
const formatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" });

const EstablishmentPage: FC = (): JSX.Element => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [establishment, setEstablishment] = useState<Establishment | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		setLoading(true);
		getEstablishmentById(id!)
			.then((data) => setEstablishment(data))
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false));
	}, [id]);

	return (
		<div className="establishment-page-container">
			<button style={{ alignSelf: "self-start" }} onClick={() => navigate(-1)}>
				Go Back
			</button>

			<h1 style={{ color: "white", textDecoration: "underline" }}>Establishment's Page</h1>

			<h2 style={{ color: "yellow" }}>FHRSID: {id}</h2>

			{loading && <div>Loading...</div>}

			{error && <div>Error: {error}</div>}

			{establishment && (
				<>
					<p>
						<span className="establishment-attribute-name">Address: </span>
						{buildAddressFromArray([
							establishment.AddressLine1,
							establishment.AddressLine2,
							establishment.AddressLine3,
							establishment.AddressLine4,
						])}
					</p>
					<p>
						<span className="establishment-attribute-name">Rating: </span>
						{establishment.RatingValue}
					</p>
					<p>
						<span className="establishment-attribute-name">Date of inspection: </span>
						{formatter.format(new Date(establishment.RatingDate))}
					</p>
				</>
			)}
		</div>
	);
};

export default EstablishmentPage;
