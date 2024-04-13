import * as Yup from "yup";

export const userValidationScheme = Yup.object().shape({
    username: Yup.string().required("نام کاربری الزامی می باشد."),
    password: Yup.number().required("وارد کردن رمز عبور الزامی میباشد"),
});