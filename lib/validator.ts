// Function to validate email
export function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Function to validate password
export function validateName(name) {
    const regex = /^[\p{L}\p{N}\p{S}\p{Pd}]+$/u;

    // Function to check if the string is valid and length is less than 20
    return regex.test(name) && Array.from(name).length < 20;
}


