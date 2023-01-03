import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'
import Header from './Header';
// import { act } from 'react-dom/test-utils'

describe("Header Test", () => {

    test("Check if headerText rendered", async () => {
        renderWithProviders(<Header />)

        const headerText = screen.getByText("User");
        expect(headerText).toBeInTheDocument()
    });
})
