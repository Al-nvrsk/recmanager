import { TRPCError } from "@trpc/server"
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
            const tags = getTags.map(el => (
                { value: el.tag, count: el._count.tag }
            ) )

            return tags
        } catch(e) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something unexpected, Try again later',
            });
        }
    })
})
