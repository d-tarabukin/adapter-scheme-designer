import * as Yup from "yup";

export const CommandValidationSchema = Yup.object().shape({
    signature: Yup.string()
        .required('Required'),
    className: Yup.string()
        .required('Required')
});
