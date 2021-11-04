class TokenService {
    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.accessToken;
    }

    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }

    getPhone() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.phone;
    }

    updateLocalAccessToken(accessToken, refreshToken) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }

    isUserSignedIn() {
        if (this.getUser()) return true 
        else return false
    }
}

export default new TokenService();