/**
 * @description check if both objects are equal
 */
export const deepEquals = (obj1, obj2) => {
    return Object.entries(obj1).toString() === Object.entries(obj2).toString();
}

/**
 * @param {Object} data - meta data of avatar and signature
 * @returns {boolean} true if both are not ""
 */

export const metaDataValidation = (data) => {
    let isValid = false;
    if (data.avatar !== "" && data.signature !== "") {
        isValid = true
    }
    return isValid
}

export const getImageReader = (file) => {
    return new Promise((resolve) => {
        let baseURL = "";
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
        };
    });
};

export const getCurrentUser = () => {
    return localStorage.getItem("userId")
}