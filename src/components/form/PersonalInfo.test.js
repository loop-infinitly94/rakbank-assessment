import React from 'react'
import { screen } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import PersonalInfo from './PersonalInfo'
import { renderWithProviders } from '../../utils/test-utils'
import { personalDetailsModified } from '../../store/UserDetailsSlice'
import { Store } from '../../store/store'
// import { act } from 'react-dom/test-utils'

describe("Personal Info Test Cases", () => {
    test('Uses preloaded state to render', async () => {

        const personalDetails = {
            "name": "Shyam",
            "email": "shyamkumar@gmail.com",
            "mobile": "1234567890",
            "addr1": "Al Barsha1",
            "addr2": "Dubai",
            "addr3": "Dubai"

        }
        let updatedObj = {
            id: 1,
            personalDetails,
            meta: {
                currentStep: 1,
            },
        };

        Store.dispatch(personalDetailsModified(updatedObj))

        renderWithProviders(<PersonalInfo />)

        const personalDetailsElements = screen.getAllByRole("textbox");
        const name = personalDetailsElements[0].value
        const email = personalDetailsElements[1].value
        const mobile = personalDetailsElements[2].value
        const addr1 = personalDetailsElements[3].value
        const addr2 = personalDetailsElements[4].value
        const addr3 = personalDetailsElements[5].value

        expect(name).toEqual("Shyam")
        expect(email).toEqual("shyamkumar@gmail.com")
        expect(mobile).toEqual("1234567890")
        expect(addr1).toEqual("Al Barsha1")
        expect(addr2).toEqual("Dubai")
        expect(addr3).toEqual("Dubai")



    })
    test("Cehck if next button rendered", async () => {
        renderWithProviders(<PersonalInfo />)

        const nextButton = screen.getByRole("button");
        expect(nextButton).toBeDefined();
    });

})
