const validateNumber = (number) => !isNaN(number);

const validateString = (string) => typeof string === "string";

const validateBoolean = (boolean) => boolean == "true" || boolean == "false" || boolean == true || boolean == false;

const validateObjectTypes = (object, objectTypes, lengthStrict) => {

    if (lengthStrict) {
        if (Object.keys(object).length !== Object.keys(objectTypes).length) {
            return false;
        }
    }

    for (key in object) {
        if (objectTypes[key] === String && !validateString(object[key])) {
            return false;
        } else if (objectTypes[key] === Number && !validateNumber(object[key])) {
            return false;
        } else if (objectTypes[key] === Boolean && !validateBoolean(object[key])) {
            return false;
        }
    }
    return true;
}

module.exports = {
    validateNumber,
    validateObjectTypes
};