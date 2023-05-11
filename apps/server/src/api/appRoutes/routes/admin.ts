import { TRPCError } from '@trpc/server';
import { protectedProcedure, publicProcedure } from '../../procedure/procedure';
import { router } from '../../trpc/trpc';
import { z as zod } from 'zod';
import { UserRole, authSchema, registrationSchema } from "common-files";
import { unExpectedError } from '../../utils/errors/unExpectedError';

const t = (message: string) => message

export const adminRouter = router({
    getAllUsers: protectedProcedure
        .query( async(req) => {
            try {
                const allUser = await req.ctx.prisma.user.findMany({
                    select: {
                        id: true,
                        email: true,
                        login: true,
                        avatar: true,
                        role: true,
                        _count: {select: {post: true, comments: true}},
                        ratings: {
                            where: {likeStatus: {equals: "liked"}},
                            select: {reviewId:true}
                        }
                    }, 
                })
                const responseAllUsers = allUser.map(user => {
                    const {_count, ratings, ...userData} = user
                    return {
                        likesCount: ratings.length,
                        reviewsCount: _count.post,
                        commentCount: _count.comments,
                        ...userData
                    }
                })
                return responseAllUsers
            } catch(e) {
                unExpectedError()
            }
        }),
    
    changeUserRole: protectedProcedure
        .input(zod.object({
            id: zod.string(),
            role: zod.nativeEnum(UserRole)
            }))
        .mutation(async req => {
            const { id, role } = req.input
            try { 
                const updatedRole = await req.ctx.prisma.user.update({
                    where: {id},
                    data: {role}
                })
                return updatedRole
            } catch (e) {
                console.log(e)
                unExpectedError()
            }
        }),
    
    deleteUser: protectedProcedure
        .input(zod.object({
            id: zod.string(),
            }))
        .mutation(async req => {
            const { id } = req.input
            try { 
                const deleteUser = await req.ctx.prisma.user.delete({
                    where: {id}
                })
                return deleteUser
            } catch (e) {
                console.log(e)
                unExpectedError()
            }
        }),
})
