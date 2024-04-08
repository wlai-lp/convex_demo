import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  agents: defineTable({ agentId: v.float64() }),
  convs: defineTable({ convoId: v.string() }),
  events: defineTable({
    agent_id: v.string(),
    conv_id: v.string(),
    event_ts: v.float64(),
    lang_id: v.string(),
  }),
  langs: defineTable({ lang: v.string() }),
  messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),
});