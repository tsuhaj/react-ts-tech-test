import { screen, render } from "@testing-library/react";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";

describe("Establishments table navigation", () => {
	it("tests if pagination buttons are enabled when on random page", async () => {
		render(<EstablishmentsTableNavigation pageNum={5} pageCount={50} onPreviousPage={jest.fn()} onNextPage={jest.fn()} />);

		const buttons = screen.getAllByRole("button");
		const previousButton = buttons[0];
		const nextButton = buttons[1];

		expect(previousButton).toBeEnabled();
		expect(nextButton).toBeEnabled();
	});

	it("tests if pagination buttons are disabled when there is only a single page", async () => {
		render(<EstablishmentsTableNavigation pageNum={1} pageCount={1} onPreviousPage={jest.fn()} onNextPage={jest.fn()} />);

		const buttons = screen.getAllByRole("button");
		const previousButton = buttons[0];
		const nextButton = buttons[1];

		expect(previousButton).toBeDisabled();
		expect(nextButton).toBeDisabled();
	});
});
