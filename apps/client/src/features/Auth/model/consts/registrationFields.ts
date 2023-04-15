import { IAuthForm } from "../types/AuthForm";

export const regFormField: (keyof IAuthForm)[] = ['firstName', 'secondName', 'email', 'login', 'password', 'confirmPassword']
