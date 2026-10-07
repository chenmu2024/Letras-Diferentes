import assert from "node:assert/strict";
import { fontStyles } from "../src/utils/textTransformers.ts";

function style(id: string) {
  const found = fontStyles.find((item) => item.id === id);
  assert.ok(found, `Missing font style: ${id}`);
  return found;
}

assert.equal(
  style("gothic-regular").transform("ABCXYZabcxyz"),
  "𝔄𝔅ℭ𝔛𝔜ℨ𝔞𝔟𝔠𝔵𝔶𝔷",
  "Gothic mapping must preserve alphabet positions."
);

assert.equal(
  style("cursive-bold").transform("ABCXYZabcxyz"),
  "𝓐𝓑𝓒𝓧𝓨𝓩𝓪𝓫𝓬𝔁𝔂𝔃",
  "Bold script mapping must preserve alphabet positions."
);

assert.equal(
  style("sans-bold-italic").transform("ABCXYZabcxyz"),
  "𝘼𝘽𝘾𝙓𝙔𝙕𝙖𝙗𝙘𝙭𝙮𝙯",
  "Sans bold italic mapping must preserve alphabet positions."
);

assert.equal(
  style("black-square").transform("AZaz"),
  "🅰🆉🅰🆉",
  "Negative squared alphabet must end with the proper Z character."
);

assert.equal(
  style("monospace").transform("AZaz09"),
  "𝙰𝚉𝚊𝚣𝟶𝟿",
  "Monospace mapping must cover letters and digits."
);

assert.equal(
  style("sans-regular").transform("Olá"),
  "𝖮𝗅á",
  "Characters without a mapped Unicode equivalent should remain unchanged."
);

for (const item of fontStyles) {
  const sample = item.transform("Letras123");
  assert.ok(sample.length > 0, `${item.id} returned an empty result`);
  assert.ok(!/angle_Z|schedule|Walker/.test(sample), `${item.id} leaked a source placeholder`);
}

console.log(`Validated ${fontStyles.length} text styles.`);
