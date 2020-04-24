import * as Yup from "yup";

export const SettingsPropertyValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required')
});
