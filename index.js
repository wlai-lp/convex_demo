import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";
import * as dotenv from "dotenv";
import * as fs from "fs"



(async () => {
  console.log("immediately triggered");

  // const fs = require('fs');

  dotenv.config({ path: ".env.local" });

  const client = new ConvexHttpClient(process.env["CONVEX_URL"]);

  const result = await client.query(api.tasks.get);
  console.log(result);

  const filePath = 'translationwidget.json';

  // const data = await fs.readFile(filePath,)

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      
      // Access the data as needed
      console.log(jsonData);
      // return jsonData;
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });

  // console.log(jsonData);

})();
