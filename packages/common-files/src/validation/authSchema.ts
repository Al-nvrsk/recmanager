import * as zod from 'zod';

export const authSchema = (t: Function) => {
  
  return zod.object({
  login: zod
    .string({
      required_error: `${t("Login can't be empty")}`,
    })
    .min(3, `${t('Login should be longer then 3 symbols')}`)
    .max(16, `${t('Login should be shorter then 16 symbols')}`)
    .regex(/(?!^\d+$)[A-Za-z0-9_-]/, `${t('Login can contain only latin letters, numbers, _ and -')}`),
  password: zod
    .string({
      required_error: `${t("Password can't be empty")}`,
    })
    .min(8, `${t('Password must be at least 8 characters')}`)
});
}
