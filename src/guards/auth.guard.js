import AuthService from "../services/AuthService"

export default function authGuard(to, from, next) {
    AuthService.init()

    if (AuthService.isGuest()) {
        next("/login");
    } else {
        next(vm => {
            vm.$store.commit("SET_USER", vm.$store.state.testUser.data);
        });
    }
}