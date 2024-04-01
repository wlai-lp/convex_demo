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

export const createEvent = mutation({
    args: { conv_id: v.string(),
            agent_id: v.string(),
            lang_id: v.string(),
            event_ts: v.number(),
     },
    handler: async (ctx, args) => {
      const eventId = await ctx.db.insert("events", { conv_id: args.conv_id,
                                                     agent_id: args.agent_id,
                                                     lang_id: args.lang_id,
                                                     event_ts: args.event_ts,
    });
      // do something with `taskId`
    },
  });