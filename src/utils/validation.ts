import * as Yup from 'yup';

const requiredErrorMessage = 'validate.require';
const validatePhone = 'validate.phone';
const requirePhone = 'validate.requirePhone';
const validateEmail = 'validate.email';
const validateRePassW = 'validate.rePassword';

const phone = Yup.string()
  .required(requirePhone)
  .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, validatePhone);
const email = Yup.string().email(validateEmail);

const rePassW = Yup.mixed().test(
  'match',
  validateRePassW,
  (password, context) => {
    return password === context.parent.password;
  },
);

export const yupSchemaInfoUser = Yup.object({
  fullName: Yup.string().required(requiredErrorMessage),
  phone,
  email,
});

export const yupSchemaLogin = Yup.object({
  phoneNumber: phone,
});

export const yupSchemaRePassword = Yup.object({
  password: Yup.string().required(requiredErrorMessage),
  rePassword: rePassW,
});
