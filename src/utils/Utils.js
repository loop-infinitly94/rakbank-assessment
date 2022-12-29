export const deepEquals = (obj1, obj2) => {
    return Object.entries(obj1).toString() === Object.entries(obj2).toString();
}