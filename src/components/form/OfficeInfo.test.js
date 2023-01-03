import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'
import { officeDetailsModified } from '../../store/UserDetailsSlice'
import { Store } from '../../store/store'
import OfficeInfo from './OfficeInfo'
// import { act } from 'react-dom/test-utils'

describe("Office Info Test Cases", () => {
    test('Uses preloaded state to render', async () => {

        const officeDetails = {
            "buildingName": "Abc building",
            "city": "Barsha",
            "landLine": "1234567890",
            "addr1": "Dubai",
            "addr2": "Dubai",
            "pbNo": "1234"
        }
        let updatedObj = {
            officeDetails,
            meta: {
                currentStep: 2,
            },
        };

        Store.dispatch(officeDetailsModified(updatedObj))

        renderWithProviders(<OfficeInfo />)

        const officeDetailElements = screen.getAllByRole("textbox");
        const buildingName = officeDetailElements[0].value
        const city = officeDetailElements[1].value
        const landLine = officeDetailElements[2].value
        const addr1 = officeDetailElements[3].value
        const addr2 = officeDetailElements[4].value
        const pbNo = officeDetailElements[5].value

        expect(buildingName).toEqual("Abc building")
        expect(city).toEqual("Barsha")
        expect(landLine).toEqual("1234567890")
        expect(addr1).toEqual("Dubai")
        expect(addr2).toEqual("Dubai")
        expect(pbNo).toEqual("1234")

    })

    test("Cehck if submit button rendered", async () => {
        renderWithProviders(<OfficeInfo />)

        const nextButton = screen.getAllByRole("button", { name: "Next" });
        expect(nextButton).toBeDefined()
    });
})
