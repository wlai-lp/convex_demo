import { query } from "./_generated/server";

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    let i = 1;
    return await ctx.db.query("convs").collect();
  },
});

export const createConv = mutation({
    args: { convoId: v.string() },
    handler: async (ctx, args) => {
      const convsId = await ctx.db.insert("convs", { convoId: args.convoId });
      // do something with `taskId`
    },
  });