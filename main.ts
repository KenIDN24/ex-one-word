// Describe Your Ex in One Word — entry program.
// Writes exactly one word to /output/entry.txt: the one-word verdict
// about an ex. Sealed gate: a single word, at most 111 characters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Unsubscribe";

const MAX_CHARS = 111;

// Guard: exactly one word, 1-111 characters, no whitespace at all.
const chars = [...WORD].length;
if (chars < 1 || chars > MAX_CHARS) {
  console.error(`error: entry is ${chars} chars, outside the 1-${MAX_CHARS} limit`);
  process.exit(1);
}
if (/\s/.test(WORD)) {
  console.error("error: entry must be a single word with no whitespace");
  process.exit(1);
}
// Craft rule from the judge brief: exactly one word, spelled correctly,
// no punctuation tricks — letters only, so the word arrives on its own.
if (!/^[A-Za-z]+$/.test(WORD)) {
  console.error("error: entry must be a single word of letters only");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD + "\n", "utf8");

// Read-back check: what landed on disk must be byte-exact.
const back = readFileSync(outPath, "utf8");
if (back !== WORD + "\n") {
  console.error("error: read-back mismatch, entry on disk differs from the word");
  process.exit(1);
}
console.log(`wrote ${chars} chars, 1 word`);
