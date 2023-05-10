import { registrationSchema } from "./registrationSchema";
import * as zod from 'zod'

export const changeUserSchema = (t: Function) => {
    return registrationSchema(t).innerType().omit({ password: true, confirmPassword: true }).extend({
        id: zod.string().optional()
    })
}

