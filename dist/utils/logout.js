export function logout() {
    localStorage.removeItem('activeUser');
    window.location.href = '/';
}
