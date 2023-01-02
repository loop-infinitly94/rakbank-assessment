import React from 'react'
import { screen, act } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import PersonalInfo from './PersonalInfo'
import { renderWithProviders } from '../../utils/test-utils'
import { initialState, personalDetailsModified } from '../../store/UserDetailsSlice'
import { Store } from '../../store/store'
// import { act } from 'react-dom/test-utils'

describe("Personal Indo Test Cases", () => {
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
        act(() => {

            Store.dispatch(personalDetailsModified(updatedObj))
        })
        renderWithProviders(<PersonalInfo />, {
            preloadedState: {
                userDetails: initialState
            }
        })



        const name = screen.getAllByRole("textbox")[0].value
        const email = screen.getAllByRole("textbox")[1].value
        const mobile = screen.getAllByRole("textbox")[2].value
        const addr1 = screen.getAllByRole("textbox")[3].value
        const addr2 = screen.getAllByRole("textbox")[4].value
        const addr3 = screen.getAllByRole("textbox")[5].value

        console.log(name)

        expect(name).toEqual("Shyam")
        expect(email).toEqual("shyamkumar@gmail.com")
        expect(mobile).toEqual("1234567890")
        expect(addr1).toEqual("Al Barsha1")
        expect(addr2).toEqual("Dubai")
        expect(addr3).toEqual("Dubai")



    })
})
