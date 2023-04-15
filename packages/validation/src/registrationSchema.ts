import { useTranslation } from 'react-i18next';
import * as zod from 'zod';
import { authSchema } from './authSchema';

export const registrationSchema = () => {
    const {t} = useTranslation()
  
    return authSchema().extend({
      firstName: zod
        .string({
          required_error: `${t("First Name can't be empty")}`,
        })
        .min(2, `${t('First name should be longer then 2 symbols')}`)
        .regex(/[A-ZА-Я][a-zа-я-]*/, `${t("The fist name must start with a capital letter")}`),
      secondName: zod
        .string({
          required_error: `${t("Second name can't be empty")}`,
        })
        .min(2, `${t('Second name should be longer then 2 symbols')}`)
        .regex(/[A-ZА-Я][a-zа-я-]*/, `${t('Second name should start with a capital letter')}`),
      email: zod
        .string({
          required_error: `${t("Email can't be empty")}`,
        })
        .email(`${t('Uncorrect email')}`),
      confirmPassword: zod
        .string()
        .min(1, `${t('Please input confirm password')}`)})
        .superRefine(({ confirmPassword, password }, ctx) => {
          if (confirmPassword !== password) {
            ctx.addIssue({
              code: "custom",
              message: `${t('The passwords did not match')}`,
              path: ['confirmPassword'],
            });
          }
        })
  }
