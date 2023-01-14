import express from 'express';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import cors from 'cors';

const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;

interface User {
    id: string;
    name: string;
}

const userList: User[] = [
    {
        id: "1",
        name: "KATTjk"
    }
];

const appRouter = router({
    getUserById: publicProcedure.input(z.string())
    .query((req) => {
        const {input} = req;
        const findUser = (user: User) => user.id === input;
        const user = userList.find(findUser);
        return user;
    })
});

const app = express()

app.use(cors());
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
)

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export type AppRouter = typeof appRouter;