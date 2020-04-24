import * as Yup from "yup";

export const SchemeValidationSchema = Yup.object().shape({
    method: Yup.string()
        .required('Required'),
    sign: Yup.string()
        .required('Required'),
});
