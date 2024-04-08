import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api";
import * as dotenv from "dotenv";
import { EventData, LanguageData }  from './types'
// import { doSomething } from "./convex/myFunctions.js";

(async () => {
  dotenv.config({ path: ".env.local" });

  const client = new ConvexHttpClient(process.env["CONVEX_URL"]!);

  // local node get example
  // client.query(api.tasks.get).then(console.log);

  // local node mutation example
  // client.mutation(api.messages.sendReq, {
  //     author: "weidogg1001",
  //     body: 'jsondata',
  //   });

  // doSomething();

  // local node get with param example
  const data = await client.query(api.messages.getMessageByAuth, {
    author: "022024",
  });
//   console.log(data[0].body);

  makeFlat(data[0].body);


})();

function makeFlat(jsonString : string){
    const jsonData = JSON.parse(jsonString);
    const eventDataArray: EventData[] = [];
    for (const convoId in jsonData) {
        console.log(`convoid = ${convoId}`);

        // 1 convo can have many agents worked on the conversation
        for (const agentId in jsonData[convoId]) {
            console.log('agent id = ' + agentId);
            const languageDataArray = jsonData[convoId][agentId] as LanguageData[];
            console.log(languageDataArray[0].language);
            const convertedDate = (new Date(languageDataArray[0].time)).toLocaleDateString('en-US')
            console.log(`converted date = ${convertedDate}`);
            
            let event: EventData = {
                convoId: convoId,
                agentId: agentId,
                language: languageDataArray[0].language,
                timestamp: languageDataArray[0].time,
                date: convertedDate
            };

            eventDataArray.push(event);
        }
    }

    console.log(eventDataArray.length);
    // cache the data to local storage
    return eventDataArray;
}


