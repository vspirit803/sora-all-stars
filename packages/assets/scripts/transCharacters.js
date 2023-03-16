import { parse } from "csv-parse/sync";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = path.resolve(__dirname, "../src/characters.csv");

console.log(csvFilePath);

const buffer = await fs.readFile(csvFilePath, "utf8");

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const result = await parse(buffer, {
  encoding: "utf8",
  columns: true,
  skip_empty_lines: true,
});

const optmizedResult = result.map((row) => {
  // key with dot should be splitted
  const newRow = {};

  Object.keys(row).forEach((key) => {
    let value = row[key];

    if(key.startsWith("[array]")) {
      key = key.replace("[array]", "");
      value = value.split(",").map((v) => v.trim());
    }

    if (key.includes(".")) {
      const keys = key.split(".");
      let currObj = newRow;

      for (const eachKey of keys.slice(0, -1)) {
        if (!currObj[eachKey]) {
          currObj[eachKey] = {};
        }

        currObj = currObj[eachKey];
      }

      currObj[keys.pop()] = value;
    } else {
      newRow[key] = value;
    }
  });

  return newRow;
});

const jsonFilePath = path.resolve(__dirname, "../src/characters.json");

await fs.writeFile(jsonFilePath, JSON.stringify(optmizedResult, null, 2));
