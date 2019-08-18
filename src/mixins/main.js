import AuthService from "../services/AuthService";

export const main = {
    data() {},

    created() {
        AuthService.init();
    },
    computed: {
        curPage() {
            let page = 1;
            if (this.$route.params.page) page = this.$route.params.page;

            return parseInt(page);
        }
    },
    methods: {
        validateField: function (value) {
            // let regularValidate = /^(|[a-z\s]+|[A-Z\s])$/iu.test(value)
            if (value.length < 5) {
                return 'invalidLength (min 5)'
            }
            // if (!regularValidate) {
            //     return 'incorrect symbols'
            // }

            return 'Correct'
        }
    }
}