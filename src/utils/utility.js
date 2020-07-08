// Shared functions

/* Takes an object and an updated property of it and returns 
* a new object with the updated properties
*/
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};