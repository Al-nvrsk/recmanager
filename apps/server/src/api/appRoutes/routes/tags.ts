import { publicProcedure } from "../../procedure/procedure"
import { router } from "../../trpc/trpc"

export const tagsRouter = router({
    getTags: publicProcedure.query(async req => {
        try {
            const getTags = await req.ctx.prisma.tags.groupBy({
                by: ['tag'],
                _count: {
                    tag: true
                }
            })

            return getTags
        } catch(e) {
            console.log(e)
        }
    })
})
