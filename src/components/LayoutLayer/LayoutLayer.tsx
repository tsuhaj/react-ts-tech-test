import { Outlet } from "react-router-dom";
import { FavoriteTable } from "../FavoriteTable/FavoriteTable";

const LayoutLayer = () => {
	return (
		<div style={{ paddingBottom: "50px" }}>
			<Outlet />
			<div style={{ marginTop: "30px" }}>
				<FavoriteTable />
			</div>
		</div>
	);
};

export default LayoutLayer;
