import * as fs from 'fs';

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
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const jsonData: ConvoData[] = JSON.parse(data);
        resolve(jsonData);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}

async function main() {
  const filePath = 'translationwidget.json'; // Specify the path to your JSON file
  try {
    const jsonData: ConvoData[] = await readJsonFile(filePath);
    console.log(jsonData.length); // Do whatever you want with the JSON data
  } catch (err) {
    console.error('Error reading JSON file:', err);
  }
}

main();
