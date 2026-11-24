// Say What Actually Broke — make.fun entry.
// Writes this entry's single-line error message to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace. This line is 166.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "The database is down because someone ran a migration on Friday at 5 PM, and the backup we promised was never tested. Please try again once we have fixed our own mess.";

const candidates = ["/output/entry.txt", "output/entry.txt"];

let wrote = "";
for (const target of candidates) {
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, LINE, "utf8");
    wrote = target;
    break;
  } catch {
    // /output may not exist outside the grading sandbox; try the next path.
  }
}

if (!wrote) {
  throw new Error("could not write entry.txt to any candidate path");
}

console.log(`wrote ${LINE.length} characters to ${wrote}`);
