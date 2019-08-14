
import AuthService from "../services/AuthServise";

export const main = {
    data() {
    },

    created() {
        AuthService.init();
    },
    methods: {
        validateField: function (value) {
            let regularValidate = /^(|[a-z\s]+|[A-Z\s])$/iu.test(value)
            if (value.length < 5) {
                return 'invalidLength (min 5)'
            }
            if (!regularValidate) {
                return 'incorrect symbols'
            }
            if (regularValidate && (value.length >= 5)) {
                return 'Correct'
            }

        },
    }
}