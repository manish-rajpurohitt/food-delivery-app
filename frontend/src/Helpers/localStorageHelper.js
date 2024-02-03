

const localStorageHelper = {};



localStorageHelper.handleLoginSession = (payload) => {
    localStorage.setItem("_token", payload.token);
}

localStorageHelper.handleLogoutSession = () => {
    localStorage.clear();
}

localStorageHelper.checkAuth = () => {
    if (localStorage.getItem("_token")) return true;
    else return false
}

export default localStorageHelper;