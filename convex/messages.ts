import { internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { httpAction } from "./_generated/server";

export const postMessage = httpAction(async (ctx, request) => {
  const { author, body } = await request.json();

  await ctx.runMutation(internal.messages.sendOne, {
    body: `Sent via HTTP action: ${body}`,
    author,
  });

  return new Response(null, {
    status: 200,
  });
});

export const getExample = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.db.query("tasks").collect();
    },
  });

export const getMessageByAuth = query({
    args: { author: v.string() },
    handler: async (ctx, args) => {
      const task = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("author"), args.author))
      .collect();
      // do something with `task`
      return task;
    },
    
  });

export const getByAuthor = httpAction(async (ctx, request) => {
    const { author, body } = await request.json();
  
    await ctx.runMutation(internal.messages.sendOne, {
      body: `Sent via HTTP action: ${body}`,
      author,
    });
  
    return new Response(null, {
      status: 200,
    });
  });

export const sendOne = internalMutation(async (ctx, { body, author }) => {
    const message = { body, author };
    await ctx.db.insert("messages", message);
    
  });

export const list = query(async (ctx) => {
  return await ctx.db.query("messages").collect();
});

export const send = mutation(async (ctx, { body, author }) => {
  const message = { body, author };
  await ctx.db.insert("messages", message);
});

export const sendReq = mutation(async (ctx, { body, author }) => {
    // const message = { body, author };
    await ctx.db.insert("messages", { body, author });
  });

export const clearAll = internalMutation(async (ctx) => {
  for (const message of await ctx.db.query("messages").collect()) {
    //await ctx.db.delete(message._id);
  }
});

export const sendExpiringMessage = mutation({
    args: { body: v.string(), author: v.string() },
    handler: async (ctx, args) => {
      const { body, author } = args;
      const id = await ctx.db.insert("messages", { body, author });
      await ctx.scheduler.runAfter(50000, internal.messages.destruct, {
        messageId: id,
      });
    },
  });
  
  export const destruct = internalMutation({
    args: {
      messageId: v.id("messages"),
    },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.messageId);
    },
  });