// import { trpc } from "../utils/trpc"
import { router, publicProcedure } from '../utils/trpc';
import { z as zod } from "zod"
import { randomUUID } from "crypto"

type User = {
  id: string
  name: string
  age: number
}

const USERS: User[] = [
  { id: "1", name: "Kyle", age: 27 },
  { id: "2", name: "Julie", age: 45 },
]


export const userRouter = router({
  userList: publicProcedure.query(() => {
    // [..]
    return [];
  }),
  createUser: publicProcedure
    .input(zod.object({ name: zod.string(), age: zod.number() }))
    .mutation(async req => {
      const { name, age } = req.input
      const user = await req.ctx.prisma.user.
      create({data:{name: name, email: 'test8@mail.com'}})
      // const user: User = { id: randomUUID(), name, age } // DB
      // USERS.push(user)
      console.log('userUser', user)
      return user
    })
    
});


