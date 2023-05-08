export function isValidEmail(email) {
    if (!email) {
        return true;
    }
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}

export function isValidNumber(value) {
    if (!value) {
        return true;
    }
    return !isNaN(value);
}
