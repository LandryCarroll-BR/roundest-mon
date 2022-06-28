import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '@/backend/router';
import { inferProcedureOutput } from '@trpc/server';


export const trpc = createReactQueryHooks<AppRouter>();

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;