import AuthService from "../services/AuthServise"

export default function authGuard(to, from, next) {
    AuthService.init()
    if (AuthService.isGuest()) {
        next("/login");
    }

}

