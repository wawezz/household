export default class AuthService {
    static storage = window.localStorage;
    static Username = null;

    static init() {
        try {
            AuthService.Username = AuthService.storage.getItem("Username");
            console.log('in Authservice', AuthService.Username)
        } catch (e) {
            AuthService.Username = null;
        }
    }

    static isGuest() {
        console.log('AuthService.Username === null:',AuthService.Username === null)
        return AuthService.Username === null;
    }
}