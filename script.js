// const fs = require('fs');
import { ConvexHttpClient, ConvexClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";
import { createEvent } from "./convex/events.ts";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// const client = new ConvexHttpClient(process.env["CONVEX_URL"]);
const client = new ConvexClient(process.env["CONVEX_URL"]);

client.query(api.tasks.get).then(console.log);

// const createEvent = api.events.createEvent
createEvent({agent_id: "12sdf3",
conv_id: "213asdfsd4",
event_ts: 4334454,
lang_id: "en",})

// client.mutation(api.events.createEvent({
//     agent_id: "12sdf3",
//     conv_id: "213asdfsd4",
//     event_ts: 4334454,
//     lang_id: "en",
//   }))

console.log("done");