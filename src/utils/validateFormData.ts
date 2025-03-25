export function validateData(data: { email: string; password: string; confirmPassword: string }) {
    const { email, password, confirmPassword } = data
    const response = {
        error: false,
        message: '',
    }

    if (!email || !password || (confirmPassword !== undefined && !confirmPassword)) {
        response.error = true
        response.message = 'Please fill all fields *'
        return response
    }

    // https://medium.com/@python-javascript-php-html-css/the-best-regular-expression-for-email-address-verification-42bf83ba2885
    const emailPattern = /^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/
    if (!emailPattern.test(email)) {
        response.error = true
        response.message = 'Invalid email format *'
        return response
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
        response.error = true
        response.message = 'Passwords do not match *'
        return response
    }

    if (password.length < 8) {
        response.error = true
        response.message = 'Password must be at least 8 characters long *'
        return response
    }

    return response
}