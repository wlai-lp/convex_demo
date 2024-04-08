import { internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { httpAction } from "./_generated/server";

export const postEvent = httpAction(async (ctx, request) => {
  const { agent_id, conv_id, event_ts, lang_id } = await request.json();

  await ctx.runMutation(internal.events.sendOne, {
    agent_id: `Sent via HTTP action: ${agent_id}`,
    conv_id: conv_id,
    event_ts: event_ts,
    lang_id: lang_id
  });

  return new Response(null, {
    status: 200,
  });
});

export const sendOne = internalMutation(async (ctx, { agent_id, conv_id, event_ts, lang_id }) => {
  
  await ctx.db.insert("events", {
    agent_id: `Sent via HTTP action: ${agent_id}`,
    conv_id: conv_id,
    event_ts: event_ts,
    lang_id: lang_id
  });
});
