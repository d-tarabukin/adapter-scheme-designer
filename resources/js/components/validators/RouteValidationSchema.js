import * as Yup from "yup";

export const RouteValidationSchema = Yup.object().shape({
    uri: Yup.string()
        .required('Required'),
    className: Yup.string()
        .required('Required')
});
