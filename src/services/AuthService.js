export default class AuthService {
    static storage = window.localStorage;
    static tokens = null;
    static uid = null;

    static init() {
        try {
            AuthService.tokens = JSON.parse(AuthService.storage.getItem("authTokens"));
        } catch (e) {
            AuthService.tokens = null;
        }
    }

    static isGuest() {
        return AuthService.tokens === null;
    }

    static setTokens(tokens) {
        AuthService.tokens = tokens;
        AuthService.storage.setItem("authTokens", JSON.stringify(tokens));
    }

    static setUser(user) {
        AuthService.setTokens(user.tokens);
        AuthService.setUserId(user.id);
    }

    static setUserId(uid) {
        AuthService.uid = uid;

        AuthService.storage.setItem("uid", JSON.stringify(uid));
    }

    static removeUser() {
        AuthService.setTokens(null);
        AuthService.setUserId(null);
    }

    static refreshAccessToken() {

    }
}