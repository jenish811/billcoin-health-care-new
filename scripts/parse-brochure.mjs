import { readFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";

const filePath = process.argv[2] || "D:/images/billcoin broch.. a.pdf";

const data = await readFile(filePath);
const parser = new PDFParse({ data });
const result = await parser.getText();
await parser.destroy();

process.stdout.write(`text_sample:\n`);
process.stdout.write(result.text.replace(/\s+/g, " ").trim().slice(0, 2500));
process.stdout.write("\n");
