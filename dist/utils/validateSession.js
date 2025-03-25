export function validateSession() {
    const user = localStorage.getItem('activeUser');
    if (!user) {
        if (window.confirm('You are not logged in. Do you want to be redirected to the login page?')) {
            window.location.href = '/';
        }
        else {
            window.location.href = '/';
        }
    }
}
