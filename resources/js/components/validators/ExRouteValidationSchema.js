import * as Yup from "yup";

export const ExRouteValidationSchema = Yup.object().shape({
    uri: Yup.string()
        .required('Required'),
    className: Yup.string()
        .required('Required')
});
