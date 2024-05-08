export const mockGetItem = jest.fn();
export const mockSetItem = jest.fn();
export const mockRemoveItem = jest.fn();
Object.defineProperty(window, "localStorage", {
	value: {
		getItem: (...args: string[]) => mockGetItem(...args),
		setItem: (...args: string[]) => mockSetItem(...args),
		removeItem: (...args: string[]) => mockRemoveItem(...args),
	},
});
