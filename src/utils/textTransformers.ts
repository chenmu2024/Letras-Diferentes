/**
 * Unicode text transformers and font generators for "Universo das Letras"
 */

// Basic alphabet templates
const ALPHABET_LOWER = "abcdefghijklmnopqrstuvwxyz";
const ALPHABET_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";

interface FontStyle {
  id: string;
  name: string;
  category: "Estiloso" | "Moderno" | "Decorativo" | "Clássico";
  transform: (text: string) => string;
}

// Helper to create character maps
function makeMap(source: string, target: string): Record<string, string> {
  const map: Record<string, string> = {};
  const targetChars = [...target];
  for (let i = 0; i < source.length; i++) {
    if (i < targetChars.length) {
      map[source[i]] = targetChars[i];
    }
  }
  return map;
}

// Subscript & Superscript maps
export const SUPERSCRIPT_MAP = {
  ...makeMap(
    ALPHABET_LOWER,
    "ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ"
  ),
  ...makeMap(
    ALPHABET_UPPER,
    "ᴬᴮᶜᴰᴱ𝘍ᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾ𝘘ᴿˢᵀᵁᵛ𝘟"
  ),
  ...makeMap(NUMBERS, "⁰¹²³⁴⁵⁶⁷⁸⁹"),
  "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾"
};

export const SUBSCRIPT_MAP = {
  ...makeMap(
    "aehijklmnoprstuvx",
    "ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ"
  ),
  ...makeMap(NUMBERS, "₀₁₂₃₄₅₆₇₈₉"),
  "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎"
};

// Various style maps
const GOTHIC_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝔄𝔅𝔖𝔇𝔈𝔉𝔊𝔏ℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜angle_Z".replace("angle_Z", "ℨ")),
  ...makeMap(ALPHABET_LOWER, "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔨𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷")
};

const GOTHIC_BOLD_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅"),
  ...makeMap(ALPHABET_LOWER, "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟")
};

const DOUBLE_STRUCK_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ"),
  ...makeMap(ALPHABET_LOWER, "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫"),
  ...makeMap(NUMBERS, "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡")
};

const SCRIPT_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵"),
  ...makeMap(ALPHABET_LOWER, "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏")
};

const SCRIPT_BOLD_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦X𝓨𝓩".replace("X", "𝓳")), // Fixed script
  ...makeMap(ALPHABET_LOWER, "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃")
};

const BOLD_SERIF_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙"),
  ...makeMap(ALPHABET_LOWER, "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳"),
  ...makeMap(NUMBERS, "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗")
};

const ITALIC_SERIF_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍"),
  ...makeMap(ALPHABET_LOWER, "𝑎𝑏𝑐𝑑𝑒𝑓𝑔𝑕𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧")
};

const BOLD_ITALIC_SERIF_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁"),
  ...makeMap(ALPHABET_LOWER, "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛")
};

const SANS_SERIF_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹"),
  ...makeMap(ALPHABET_LOWER, "𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓"),
  ...makeMap(NUMBERS, "𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫")
};

const SANS_SERIF_BOLD_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭"),
  ...makeMap(ALPHABET_LOWER, "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇"),
  ...makeMap(NUMBERS, "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵")
};

const SANS_SERIF_ITALIC_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡"),
  ...makeMap(ALPHABET_LOWER, "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻")
};

const SANS_SERIF_BOLD_ITALIC_MAP = {
  ...makeMap(ALPHABET_UPPER, "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕"),
  ...makeMap(ALPHABET_LOWER, "𝙖𝙗𝙘𝙙𝙚𝙯𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯".replace("𝙯", "𝖋"))
};

const BUBBLE_MAP = {
  ...makeMap(ALPHABET_UPPER, "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ"),
  ...makeMap(ALPHABET_LOWER, "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ"),
  ...makeMap(NUMBERS, "⓪①②③④⑤⑥⑦⑧⑨")
};

const BLACK_BUBBLE_MAP = {
  ...makeMap(ALPHABET_UPPER, "🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐 schedule🅒🅓🅔 Walker🅖🅈🅘🅙🅚L".replace(" schedule", "🅑").replace(" Walker", "🅕")), // Manual adjust
  ...makeMap(ALPHABET_UPPER, "🅐🅑🅒🅓🅔F🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩"),
  ...makeMap(ALPHABET_LOWER, "🅐🅑🅒🅓🅔F🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩"),
  ...makeMap(NUMBERS, "⓿❶❷❸❹❺❻❼❽❾")
};

const SQUARE_MAP = {
  ...makeMap(ALPHABET_UPPER, "🄰🄱🄲🄳🄴🄵🄿🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🄱🅁🅂🅃🅄🅅🅆🅇🅈🅉"),
  ...makeMap(ALPHABET_UPPER, "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🄱🅁🅂🅃🅄🅅🅆🅇🅈🅉"),
  ...makeMap(ALPHABET_LOWER, "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🄱🅁🅂🅃🅄🅅🅆🅇🅈🅉"),
};

const BLACK_SQUARE_MAP = {
  ...makeMap(ALPHABET_UPPER, "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆋"),
  ...makeMap(ALPHABET_LOWER, "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆋")
};

const SMALL_CAPS_MAP = {
  ...makeMap(ALPHABET_LOWER, "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ"),
  ...makeMap(ALPHABET_UPPER, "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ")
};

const UPSIDE_DOWN_MAP = {
  ...makeMap(ALPHABET_LOWER, "ɐqɔpǝɟɓɥıɾʞlɯuodbɹsʇnʌʍxʎz"),
  ...makeMap(ALPHABET_UPPER, "ⱯᗺƆᗡƎℲ⅁HIſʞ˥WNOԀΌᴚS┴∩ΛMᙏ⅄Z"),
  ...makeMap(NUMBERS, "0ƖᄅƐㄣϛ9ㄥ86"),
  "a": "ɐ", "b": "q", "c": "ɔ", "d": "p", "e": "ǝ", "f": "ɟ", "g": "ɓ", "h": "ɥ",
  "i": "ı", "j": "ɾ", "k": "ʞ", "l": "l", "m": "ɯ", "n": "u", "o": "o", "p": "d",
  "q": "b", "r": "ɹ", "s": "s", "t": "ʇ", "u": "n", "v": "ʌ", "w": "ʍ", "x": "x",
  "y": "ʎ", "z": "z",
  ".": "˙", "?": "¿", "!": "¡", "'": ",", "\"": "„", ",": "'", "_": "‾"
};

const WIDE_MAP = {
  ...makeMap(ALPHABET_UPPER, "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ"),
  ...makeMap(ALPHABET_LOWER, "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ"),
  ...makeMap(NUMBERS, "０１２３４５６７８９")
};

// Map based string generator helper
function transformWithMap(text: string, map: Record<string, string>): string {
  return text
    .split("")
    .map((char) => map[char] || char)
    .join("");
}

// Special decorative transformers
const decorationStyles = [
  { prefix: "꧁ ", suffix: " ꧂" },
  { prefix: "✨ ", suffix: " ✨" },
  { prefix: "★彡 ", suffix: " 彡★" },
  { prefix: "╰•𓆩 ", suffix: " 𓆪•╯" },
  { prefix: "⚡ ", suffix: " ⚡" },
  { prefix: "☠️ ", suffix: " ☠️" },
  { prefix: "✿ ", suffix: " ✿" },
  { prefix: "⚙️ ", suffix: " ⚙️" },
  { prefix: "❤ ", suffix: " ❤" },
  { prefix: "👑 ", suffix: " 👑" },
  { prefix: "« Letra » ", suffix: " «" },
  { prefix: "☂️ ", suffix: " ☂️" }
];

export const fontStyles: FontStyle[] = [
  {
    id: "double-struck",
    name: "Corda Dupla (Outline)",
    category: "Estiloso",
    transform: (text) => transformWithMap(text, DOUBLE_STRUCK_MAP)
  },
  {
    id: "gothic-bold",
    name: "Gótico Negrito (Gothic)",
    category: "Clássico",
    transform: (text) => transformWithMap(text, GOTHIC_BOLD_MAP)
  },
  {
    id: "gothic-regular",
    name: "Gótico Medieval",
    category: "Clássico",
    transform: (text) => transformWithMap(text, GOTHIC_MAP)
  },
  {
    id: "cursive-bold",
    name: "Manuscrito Negrito",
    category: "Estiloso",
    transform: (text) => transformWithMap(text, SCRIPT_BOLD_MAP)
  },
  {
    id: "cursive-regular",
    name: "Cursiva Clássica",
    category: "Clássico",
    transform: (text) => transformWithMap(text, SCRIPT_MAP)
  },
  {
    id: "bold-serif",
    name: "Serifa Negrito",
    category: "Moderno",
    transform: (text) => transformWithMap(text, BOLD_SERIF_MAP)
  },
  {
    id: "italic-serif",
    name: "Serifa Itálico",
    category: "Moderno",
    transform: (text) => transformWithMap(text, ITALIC_SERIF_MAP)
  },
  {
    id: "bold-italic-serif",
    name: "Serifa Negrito Itálico",
    category: "Moderno",
    transform: (text) => transformWithMap(text, BOLD_ITALIC_SERIF_MAP)
  },
  {
    id: "sans-bold",
    name: "Sem Serifa Negrito",
    category: "Moderno",
    transform: (text) => transformWithMap(text, SANS_SERIF_BOLD_MAP)
  },
  {
    id: "sans-italic",
    name: "Sem Serifa Itálico",
    category: "Moderno",
    transform: (text) => transformWithMap(text, SANS_SERIF_ITALIC_MAP)
  },
  {
    id: "sans-bold-italic",
    name: "Sem Serifa Negrito Itálico",
    category: "Moderno",
    transform: (text) => transformWithMap(text, SANS_SERIF_BOLD_ITALIC_MAP)
  },
  {
    id: "bubble",
    name: "Bolas Circuladas (Bubble)",
    category: "Decorativo",
    transform: (text) => transformWithMap(text, BUBBLE_MAP)
  },
  {
    id: "black-bubble",
    name: "Bolas Negras (Black Bubble)",
    category: "Decorativo",
    transform: (text) => transformWithMap(text, BLACK_BUBBLE_MAP)
  },
  {
    id: "square",
    name: "Letras de Caixas (Square)",
    category: "Decorativo",
    transform: (text) => transformWithMap(text, SQUARE_MAP)
  },
  {
    id: "black-square",
    name: "Caixas Pretas (Filled Square)",
    category: "Decorativo",
    transform: (text) => transformWithMap(text, BLACK_SQUARE_MAP)
  },
  {
    id: "small-caps",
    name: "Minúsculas Grandes (Small Caps)",
    category: "Moderno",
    transform: (text) => transformWithMap(text, SMALL_CAPS_MAP)
  },
  {
    id: "upside-down",
    name: "De Cabeça para Baixo",
    category: "Decorativo",
    transform: (text) => {
      // Upside down reverse the array to read upside down
      const converted = transformWithMap(text, UPSIDE_DOWN_MAP);
      return converted.split("").reverse().join("");
    }
  },
  {
    id: "wide",
    name: "E s p a ç a d o (Wide)",
    category: "Moderno",
    transform: (text) => transformWithMap(text, WIDE_MAP)
  },
  {
    id: "strikethrough",
    name: "Texto Tachado",
    category: "Decorativo",
    transform: (text) => text.split("").map(c => c + "\u0336").join("")
  },
  {
    id: "underline-double",
    name: "Sublinhado Duplo",
    category: "Decorativo",
    transform: (text) => text.split("").map(c => c + "\u0333").join("")
  },
  {
    id: "slashthrough",
    name: "Texto Cortado",
    category: "Decorativo",
    transform: (text) => text.split("").map(c => c + "\u0338").join("")
  },
  {
    id: "sparkles",
    name: "Cintilante Estrelado",
    category: "Decorativo",
    transform: (text) => "✨ " + text.split("").join(" ✨ ") + " ✨"
  },
  {
    id: "vaporwave",
    name: "Vaporwave Aesthetic",
    category: "Decorativo",
    transform: (text) => text.split("").join(" ＼(★)／ ")
  },
  ...decorationStyles.map((style, index) => ({
    id: `deco-${index}`,
    name: `Decoração ${style.prefix.trim() || "Estilo"} ${style.suffix.trim() || ""}`,
    category: "Decorativo" as const,
    transform: (text: string) => `${style.prefix}${text}${style.suffix}`
  }))
];
