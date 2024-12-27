import * as validate from 'yup'
const RegularExp = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";

export const RegistrationSchema = validate.object({
    name: validate.string().min(3).required("Please enter the name"),
    email: validate.string().email("Please enter valid email").required("Please enter the email"),
    date: validate.string().required("Please select date"),
})

export const LoginSchema = validate.object({
    email: validate.string().email("Please enter valid email").required("Please enter the email"),
    password: validate.string().matches(RegularExp, "Please enter valid password").required("Please enter the password"),
})