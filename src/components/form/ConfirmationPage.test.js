import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'
import { officeDetailsModified, personalDetailsModified, updateMetaData } from '../../store/UserDetailsSlice'
import { Store } from '../../store/store'
import ConfirmationPage from './ConfirmationPage'
// import { act } from 'react-dom/test-utils'

describe("Office Info Test Cases", () => {
    test('Uses preloaded state to render', async () => {
        let metaData = {
            meta: {
                avatar: "test",
                signature: "test"
            },
        };

        const officeDetails = {
            "buildingName": "Abc building",
            "city": "Barsha",
            "landLine": "00000000000",
            "addr1": "addr1",
            "addr2": "addr2",
            "pbNo": "1234"
        }
        let updatedObj = {
            officeDetails,
            meta: {
                currentStep: 2,
            },
        };

        const personalDetails = {
            "name": "Shyam",
            "email": "shyamkumar@gmail.com",
            "mobile": "1234567890",
            "addr1": "Al Barsha1",
            "addr2": "Dubai",
            "addr3": "UAE"

        }
        let personaLDetailObj = {
            id: 1,
            personalDetails,
            meta: {
                currentStep: 1,
            },
        };

        Store.dispatch(personalDetailsModified(personaLDetailObj))

        Store.dispatch(officeDetailsModified(updatedObj))

        Store.dispatch(updateMetaData(metaData))

        renderWithProviders(<ConfirmationPage />)

        const avatar = screen.getByAltText("avatar").src
        const signature = screen.getByAltText("signature").src

        const name = screen.getByText("Shyam");
        const email = screen.getByText("shyamkumar@gmail.com");
        const mobile = screen.getByText("1234567890");
        const addr1 = screen.getByText("Al Barsha1");
        const addr2 = screen.getByText("Dubai");
        const addr3 = screen.getByText("UAE");
        const buildingName = screen.getByText("Abc building");
        const city = screen.getByText("Barsha");
        const landLine = screen.getByText("00000000000");
        const offaddr1 = screen.getByText("addr1");
        const offaddr2 = screen.getByText("addr2");
        const pbNo = screen.getByText("1234");

        expect(buildingName).toBeInTheDocument()
        expect(city).toBeInTheDocument()
        expect(landLine).toBeInTheDocument()
        expect(offaddr1).toBeInTheDocument()
        expect(offaddr2).toBeInTheDocument()
        expect(pbNo).toBeInTheDocument()

        expect(name).toBeInTheDocument()
        expect(email).toBeInTheDocument()
        expect(mobile).toBeInTheDocument()
        expect(addr1).toBeInTheDocument()
        expect(addr2).toBeInTheDocument()
        expect(addr3).toBeInTheDocument()

        expect(avatar).toContain("test")
        expect(signature).toContain("test")


    })

    test("Cehck if submit button rendered", async () => {
        renderWithProviders(<ConfirmationPage />)

        const nextButton = screen.getAllByRole("button", { name: "Submit" });
        expect(nextButton).toBeDefined()
    });


    test("Cehck if back button rendered", async () => {
        renderWithProviders(<ConfirmationPage />)

        const backButton = screen.getAllByRole("button", { name: "back" });
        expect(backButton).toBeDefined()
    });
})
