# Note
this setup is to have a sdk setup to create convex function
which is a websocket connecting that gets updated in real time

this sets up your local develop to start creating convex functions
this is what i think how it works
- setup sdk, run npx convex dev
- convex dev runs in background and sync your local dev env to cloud
- you use local dev to create convex function which just logic to manipulate dbs
- convex generates a endpoint and uses it's js client to consume the functions you created
- anything in /convex folder is uploaded to the cloud by convex dev
- use index.html page to test the function, run it use vscode live server
- or use node to run `node script.js` to use its node.sdk
- it uses web socket and does live update

# URL
https://docs.convex.dev/quickstart/nodejs

# cmds
```
mkdir my-project && cd my-project && npm init -y && npm pkg set type="module"
npm install convex dotenv
npx convex dev
```

Create sample data for your database
In a new terminal window, create a sampleData.jsonl file with some sample data.

{"text": "Buy groceries", "isCompleted": true}
{"text": "Go for a swim", "isCompleted": true}
{"text": "Integrate Convex", "isCompleted": false}

use this to import data and create table tasks
```
npx convex import --table tasks sampleData.jsonl
```

# create db query
Expose a database query
Add a new file tasks.js in the convex/ folder with a query function that loads the data.

Exporting a query function from this file declares an API function named after the file and the export name, api.tasks.get.
```
import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});
```

# npx convex dev
- once you run the local convex dev server, it automatically sync your local node project changes  - amazing

# CONVEX_URL
i believe the `npx convex dev` commend creates it and saves it to your .env.local

# Syntax
in convex/messaging.ts
``` 
export const sendReq = mutation(async (ctx, { body, author }) => {
    // const message = { body, author };
    await ctx.db.insert("messages", { body, author });
  });
```
in script.ts
```
const client = new ConvexHttpClient(process.env["CONVEX_URL"]!);

client.query(api.tasks.get).then(console.log);

client.mutation(api.messages.sendReq, {
    author: "weidogg1001",
    body: 'jsondata',
  });
```