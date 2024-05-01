import { FC, createContext, useContext, useEffect, useState } from "react";

interface FavoriteContextType {
	favoriteEstablishmentIds: string[];
	addToFavorites: (id: string) => void;
	removeFromFavorites: (id: string) => void;
}

const localStorageKey = "favorite-establishment-ids";

const FavoriteContext = createContext<FavoriteContextType | null>(null);

const FavoriteProvider: FC = ({ children }) => {
	const [favoriteEstablishmentIds, setFavoriteEstablishmentIds] = useState<string[]>(() => {
		const storedData = localStorage.getItem(localStorageKey);
		return storedData ? JSON.parse(storedData) : [];
	});

	const addToFavorites = (id: string) => {
		if (!favoriteEstablishmentIds.includes(id)) setFavoriteEstablishmentIds((oldVals) => [...oldVals, id]);
	};

	const removeFromFavorites = (id: string) => {
		setFavoriteEstablishmentIds((oldVals) => oldVals.filter((val) => val !== id));
	};

	useEffect(() => {
		localStorage.setItem(localStorageKey, JSON.stringify(favoriteEstablishmentIds));
	}, [favoriteEstablishmentIds]);

	const contextObject = { favoriteEstablishmentIds, addToFavorites, removeFromFavorites };

	return <FavoriteContext.Provider value={contextObject}>{children}</FavoriteContext.Provider>;
};

export const useFavorite = () => {
	const context = useContext(FavoriteContext);
	if (context === undefined) {
		throw new Error("useFavorite must be used within its Provider");
	}
	return context!;
};

export default FavoriteProvider;
