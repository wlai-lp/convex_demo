import * as fs from "fs";

import { ConvexHttpClient, ConvexClient } from "convex/browser";

import { api } from "./convex/_generated/api.js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// const client = new ConvexHttpClient(process.env["CONVEX_URL"]!);
// const clientConv = new ConvexClient(process.env["CONVEX_URL"]!);

type eventData = {
  convoId: string;
  agentId: string;
  language: string;
  timestamp: number;
};

type LanguageData = {
  language: string;
  time: number;
};

type ConvoData = {
  [convoId: string]: {
    [agentId: string]: LanguageData[];
  };
};

async function readJsonFile(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}

function convertEvents(jsonData: any) {
  // Convert the JSON data into an array of UserMessage objects
  const eventDataArray: eventData[] = [];
  for (const convoId in jsonData) {
    console.log(`convoid = ${convoId}`);

    // 1 convo can have many agents worked on the conversation
    for (const agentId in jsonData[convoId]) {
      console.log("agent id = " + agentId);
      const languageDataArray = jsonData[convoId][agentId] as LanguageData[];
      console.log(languageDataArray[0].language);
      let event: eventData = {
        convoId: convoId,
        agentId: agentId,
        language: languageDataArray[0].language,
        timestamp: languageDataArray[0].time,
      };

      eventDataArray.push(event);            
    }
    // for (const messageId in jsonData[userId]) {
    //     const languageDataArray = jsonData[userId][messageId] as LanguageData[];
    //     languageDataArray.forEach(languageData => {
    //         dataArray.push({
    //             userId,
    //             messageId,
    //             languageData
    //         });
    //     });
    // }
  }

  console.log(eventDataArray.length);
  return eventDataArray;
}

async function persistEvent(eventDataArray : eventData[]){
    
    
    // const addNewEvent = useMutation(api.events.createEvent);
    for(const event in eventDataArray){
        const eventObj = JSON.parse(event);
        // clientConv.mutation(api.events.createEvent, eventObj)
        // addNewEvent(eventObj);
    }

}

async function main() {
  const filePath = "translationwidget.json"; // Specify the path to your JSON file
  try {
    const jsonData = await readJsonFile(filePath);
    const eventDataArray = convertEvents(jsonData);
    persistEvent(eventDataArray!);
    console.log(eventDataArray?.length)
    // console.log(jsonData.length); // Do whatever you want with the JSON data
  } catch (err) {
    console.error("Error reading JSON file:", err);
  }
}

main();
