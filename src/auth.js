export function getToken() {
    return sessionStorage.getItem("JWT") || null;
}

export function clearToken() {
    sessionStorage.removeItem("JWT");
}

export function getUserId() {
    let user = sessionStorage.getItem("user");
    if (!user) return null;
    user = JSON.parse(user);
    return (user).id;
}

export function getUser() {
    let user = localStorage.getItem("user");
    if (!user) return null;
    user = JSON.parse(user);
    return user;
}

export function clear() {
    sessionStorage.removeItem("JWT");
    sessionStorage.removeItem("user");
}