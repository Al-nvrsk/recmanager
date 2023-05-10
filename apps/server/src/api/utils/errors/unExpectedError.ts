import { TRPCError } from "@trpc/server";

export const unExpectedError = (value?:string) => {
    throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: value ?? 'Something unexpected, Try again later',
    });
}
