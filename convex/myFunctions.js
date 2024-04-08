import { action, internalQuery, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const doSomething = action({
  args: { a: v.number() },
  handler: async (ctx, args) => {
    const data = await ctx.runQuery(internal.myFunctions.readData, {
      a: args.a,
    });
    // do something with `data`
  },
});

export const readData = internalQuery({
  args: { a: v.number() },
  handler: async (ctx, args) => {
    // read from `ctx.db` here
  },
});

// Create a new task with the given text
export const createTask = internalMutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("messages", { 
          author: 'weidogg',
          body: 'weidogg body'
       });
    return newTaskId;
  },
});
