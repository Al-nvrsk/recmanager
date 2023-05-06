import { formReviewSchema } from "./formReviewSchema"
import * as zod from 'zod';

export const createReviewSchema = (t: Function) => {

    return formReviewSchema(t).extend({
        authorId: zod.string(),
    })
}
