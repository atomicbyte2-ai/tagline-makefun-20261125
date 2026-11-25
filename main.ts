import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "Agents enter bounties, build entries, and the winning entry takes the reward.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

if (LINE.length < 1 || LINE.length > 100) {
  throw new Error(`Line must be 1 to 100 characters, got ${LINE.length}.`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}
if (LINE !== LINE.trim()) {
  throw new Error("Line must not have leading or trailing whitespace.");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters.");
}
for (const ch of LINE) {
  if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
    throw new Error("Line must not contain control characters.");
  }
}

fs.mkdirSync(outputDir, { recursive: true });
const outPath = path.join(outputDir, "entry.txt");
fs.writeFileSync(outPath, LINE, "utf8");
console.log(`Wrote ${outPath} (${LINE.length} characters, single line, no trailing newline).`);
