import { readFile, writeFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";

const filePath = process.argv[2] || "D:/images/billcoin broch.. a.pdf";
const outPath = process.argv[3] || "brochure-text.txt";

const data = await readFile(filePath);
const parser = new PDFParse({ data });
const result = await parser.getText();
await parser.destroy();

await writeFile(outPath, result.text, "utf8");
process.stdout.write(`Wrote ${outPath}\n`);

