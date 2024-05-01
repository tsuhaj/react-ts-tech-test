import { Outlet } from "react-router-dom";
import { FavoriteTable } from "./FavoriteTable";

const LayoutLayer = () => {
	return (
		<>
			<Outlet />
			<div style={{ marginTop: "30px" }}>
				<FavoriteTable />
			</div>
		</>
	);
};

export default LayoutLayer;
