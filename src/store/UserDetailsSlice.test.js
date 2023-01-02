import axios from 'axios';
import reducer, { initialState, officeDetailsModified, personalDetailsModified } from './UserDetailsSlice'

test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState)
})

test('should handle adding personal info', async () => {
    const previousState = initialState;
    const personalDetails = {
        "name": "asdasd",
        "email": "asdasd",
        "mobile": "asdasd",
        "addr1": "asdasd",
        "addr2": "asdasd",
        "addr3": "asdasd"

    }
    let updatedObj = {
        id: 1,
        personalDetails,
        meta: {
            currentStep: 1,
        },
    };

    const finalState = {
        userData: {
            "id": 1,
            "personalDetails": personalDetails,
            "officeDetails": {
                "buildingName": "",
                "city": "",
                "landLine": "",
                "addr1": "",
                "addr2": "",
                "pbNo": ""
            },
            "meta": {
                "avatar": "",
                "signature": "",
                "currentStep": 1, // currentStep of the user in the stepper
                "isCompleted": false // determines if the application is regitred
            }
        },
        status: 'idle',
        error: null,
        currentStep: null
    }

    const mockGet = jest.spyOn(axios, 'post');
    mockGet.mockImplementation(() => {

        return Promise.resolve(updatedObj);

    });
    const actual = await axios.post();
    expect(reducer(previousState, personalDetailsModified(actual))).toEqual(finalState)
})

test('should handle updating Office info', async () => {
    const previousState = initialState;
    const officeDetails = {
        "buildingName": "asdasdasd",
        "city": "asdasdasd",
        "landLine": "asdsad",
        "addr1": "asdasd",
        "addr2": "asdasd",
        "pbNo": "asdasdsad"

    }
    let updatedObj = {
        officeDetails,
        meta: {
            currentStep: 2,
        },
    };

    const finalState = {
        userData: {
            "id": 1,
            "personalDetails": {
                "name": "",
                "email": "",
                "mobile": "",
                "addr1": "",
                "addr2": "",
                "addr3": ""
            },
            "officeDetails": officeDetails,
            "meta": {
                "avatar": "",
                "signature": "",
                "currentStep": 2, // currentStep of the user in the stepper
                "isCompleted": false // determines if the application is regitred
            }
        },
        status: 'idle',
        error: null,
        currentStep: null
    }
    const mockGet = jest.spyOn(axios, 'put');
    mockGet.mockImplementation(() => {
        const response = Object.assign({}, updatedObj)
        response.id = 1;
        return Promise.resolve(response);

    });
    const actual = await axios.put();
    expect(reducer(previousState, officeDetailsModified(actual))).toEqual(finalState)
})

test('should handle updating meta data', async () => {
    const previousState = initialState;
    const meta = {
        avatar: "avatar",
        signature: "signature",
        currentStep: 2,
        isCompleted: true
    }

    const finalState = {
        userData: {
            "id": 1,
            "personalDetails": {
                "name": "",
                "email": "",
                "mobile": "",
                "addr1": "",
                "addr2": "",
                "addr3": ""
            },
            "officeDetails": {
                "buildingName": "",
                "city": "",
                "landLine": "",
                "addr1": "",
                "addr2": "",
                "pbNo": ""
            },
            "meta": meta
        },
        status: 'idle',
        error: null,
        currentStep: null
    }

    const mockGet = jest.spyOn(axios, 'put');
    mockGet.mockImplementation(() => {
        const response = Object.assign({}, { meta })
        response.id = 1;
        return Promise.resolve(response);

    });
    const actual = await axios.put();

    expect(reducer(previousState, officeDetailsModified(actual))).toEqual(finalState)
})