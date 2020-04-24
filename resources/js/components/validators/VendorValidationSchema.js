import * as Yup from "yup";

export const VendorValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    version: Yup.string()
        .required('Required')
});
