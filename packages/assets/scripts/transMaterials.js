import { parse } from "csv-parse/sync";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = path.resolve(__dirname, "../src/materials.csv");

console.log(csvFilePath);

const buffer = await fs.readFile(csvFilePath, "utf8");

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const result = await parse(buffer, {
  encoding: "utf8",
  columns: true,
  skip_empty_lines: true,
});

const jsonFilePath = path.resolve(__dirname, "../src/materials.json");

await fs.writeFile(jsonFilePath, JSON.stringify(result, null, 2));
