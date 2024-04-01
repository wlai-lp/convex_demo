import { query } from "./_generated/server";

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    let i = 1;
    return await ctx.db.query("tasks").collect();
  },
});

export const createTask = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
      const taskId = await ctx.db.insert("tasks", { text: args.text });
      // do something with `taskId`
    },
  });