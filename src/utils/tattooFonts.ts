/**
 * Tattoo font presets and utility descriptions for Letras para Tatuagem
 */

// Inject tattoo-specific Google Fonts into the document dynamically
if (typeof document !== "undefined") {
  const linkId = "tattoo-google-fonts";
  if (!document.getElementById(linkId)) {
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Great+Vibes&family=Sacramento&family=Pirata+One&family=Pinyon+Script&family=UnifrakturMaguntia&family=Alex+Brush&family=Parisienne&family=Monsieur+La+Doulaise&family=Arizonia&family=Playfair+Display:ital,wght@1,700&display=swap";
    link.media = "print";
    link.onload = function() {
      (this as any).media = "all";
    };
    document.head.appendChild(link);
  }
}

export interface InkStyle {
  id: string;
  name: string;
  fontFamily: string;
  category: string;
  description: string;
  fontStyle?: string;
  fontWeight?: string;
}

export const TATTOO_FONTS: InkStyle[] = [
  {
    id: "gothic-medieval",
    name: "Gótica Medieval (Pirata)",
    fontFamily: "'Pirata One', cursive, serif",
    category: "Gótica",
    description: "Inspirada em pergaminhos antigos, ideal para palavras curtas e nomes fortes de impacto clássico.",
    fontWeight: "700"
  },
  {
    id: "gothic-german",
    name: "Fraktur Germânica",
    fontFamily: "'UnifrakturMaguntia', serif",
    category: "Gótica",
    description: "Estilo germânico ultra ornamentado para tatuagens misteriosas e caligrafias densas."
  },
  {
    id: "cursiva-fina",
    name: "Sacramento Caligráfico",
    fontFamily: "'Sacramento', cursive",
    category: "Cursiva",
    description: "Letras extremamente finas, sofisticadas e contínuas. Muito procurada para frases no antebraço e costelas."
  },
  {
    id: "cursiva-romantica",
    name: "Great Vibes (Elegante)",
    fontFamily: "'Great Vibes', cursive",
    category: "Cursiva",
    description: "Letras fluidas com arabescos delicados, perfeita para nomes de família, homenagens e casamentos."
  },
  {
    id: "cursiva-alex",
    name: "Alex Brush Royal",
    fontFamily: "'Alex Brush', cursive",
    category: "Cursiva",
    description: "Traços suaves e bem balanceados com legibilidade premium, perfeita para assinaturas e nomes."
  },
  {
    id: "cursiva-parisienne",
    name: "Parisienne Glamour",
    fontFamily: "'Parisienne', cursive",
    category: "Cursiva",
    description: "Estilo vintage francês com leve inclinação e espírito boêmio e chic."
  },
  {
    id: "cursiva-arizonia",
    name: "Arizonia Free Spirit",
    fontFamily: "'Arizonia', cursive",
    category: "Moderna",
    description: "Um estilo de pincelada solta com curvas acentuadas e espírito de liberdade."
  },
  {
    id: "cursiva-lord",
    name: "Monsieur Caligrafia Exagerada",
    fontFamily: "'Monsieur La Doulaise', cursive",
    category: "Rara",
    description: "Curvas majestosas e ornamentações exageradamente floridas para quem busca exclusividade máxima."
  },
  {
    id: "script-chicano",
    name: "Escrita Chicana",
    fontFamily: "'Pinyon Script', cursive",
    category: "Chicana",
    description: "Curvas dramáticas, laços longos e inclinação acentuada. Lembra o estilo tradicional californiano de gangues e murais."
  },
  {
    id: "serif-tattoo",
    name: "Editorial Serif Italic",
    fontFamily: "'Playfair Display', serif",
    category: "Minimalista",
    fontStyle: "italic",
    fontWeight: "700",
    description: "Letras de máquina clássicas, inclinadas com sofisticação poética moderna. Muito usada em micro-tatuagens."
  },
  {
    id: "cinzel-dec",
    name: "Old English Imperial",
    fontFamily: "'Cinzel Decorative', serif",
    category: "Imperial",
    description: "Letras romanas com decorações majestosas nas pontas. Ideal para números romanos e datas importantes.",
    fontWeight: "700"
  }
];
