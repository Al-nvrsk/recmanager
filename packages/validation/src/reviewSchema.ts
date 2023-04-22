import * as zod from 'zod';

export const reviewSchema = (t: Function) => {

    return zod.object({
        ReviewName: zod
            .string({
                required_error: `${t("Review Name can't be empty")}`,
            }),
        TitleOfWork: zod
            .string({
                required_error: `${t("Title of work can't be empty")}`,
        }),
        TypeOfWork: zod
            .string({
                required_error: `${t("Type of work can't be empty")}`,
        }),
        Tags: zod
            .string({ required_error: `${t("Tags can't be empty")}`})
            .or( 
                zod
                    .array(
                        zod
                        .string()
                        .min(3, `${t('Tags should be at least 3 symbols')}`)
                        )
                    .nonempty({ message: `${t("Tags can't be empty")}` })
            ),
        AuthRating: zod
            .number({ required_error: `${t("Rating can't be empty")}`})
            .max(10),
        ReviewText: zod
            .string({ required_error: `${t("Review text can't be empty")}`})
    })
}
