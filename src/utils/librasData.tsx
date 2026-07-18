import React from "react";

export interface LibrasSign {
  description: string;
  direction: string;
  svg: React.ReactNode;
}

// Helper to draw consistent elegant vector hands for LIBRAS
// We will represent gestures with simple stylized geometric elements (palm, active fingers, movement arrow)
// This is extremely light-weight, clean, and has high accessibility value.
const makeHandSign = (fingerHeights: number[], thumbPos: "left" | "right" | "center" | "tucked", arrowDirection?: "up" | "circle" | "none") => {
  return (
    <svg className="w-full h-full text-current" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Wrist / Palm base */}
      <rect x="35" y="60" width="30" height="25" rx="6" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2.5" />
      {/* Palm Main */}
      <rect x="30" y="38" width="40" height="30" rx="8" fill="currentColor" stroke="currentColor" strokeWidth="2.5" />
      
      {/* 4 Fingers (Index, Middle, Ring, Pinky) from left to right inside the palm block */}
      {fingerHeights.map((h, i) => {
        const xOffset = 33 + i * 8;
        return (
          <rect
            key={i}
            x={xOffset}
            y={38 - h}
            width="6"
            height={h > 0 ? h + 10 : 8}
            rx="3"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Thumb representation based on position */}
      {thumbPos === "left" && (
        <rect x="18" y="44" width="14" height="6" rx="3" fill="currentColor" stroke="currentColor" strokeWidth="2" transform="rotate(-15 18 44)" />
      )}
      {thumbPos === "right" && (
        <rect x="68" y="44" width="14" height="6" rx="3" fill="currentColor" stroke="currentColor" strokeWidth="2" transform="rotate(15 68 44)" />
      )}
      {thumbPos === "center" && (
        <circle cx="50" cy="46" r="5.5" fill="currentColor" stroke="currentColor" strokeWidth="2" />
      )}
      {thumbPos === "tucked" && (
        <rect x="34" y="48" width="18" height="6" rx="3" fill="currentColor" stroke="currentColor" strokeWidth="2" />
      )}

      {/* Movement directional arrow indicator if present */}
      {arrowDirection === "up" && (
        <path d="M50 82V68M50 68L46 72M50 68L54 72" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {arrowDirection === "circle" && (
        <path d="M42 80 C 42 75, 58 75, 58 80 C 58 85, 42 85, 48 83" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );
};

export const LIBRAS_DICTIONARY: Record<string, LibrasSign> = {
  A: {
    description: "Mão fechada, dedos dobrados e o polegar encostado lateralmente ao lado do dedo indicador.",
    direction: "Estático",
    svg: makeHandSign([0, 0, 0, 0], "right")
  },
  B: {
    description: "Mão aberta com os quatro dedos estendidos e juntos. O polegar dobra-se em direção à palma.",
    direction: "Estático",
    svg: makeHandSign([24, 24, 24, 24], "tucked")
  },
  C: {
    description: "Dedos e polegar curvados imitando o formato da letra 'C' em perfil.",
    direction: "Estático",
    svg: makeHandSign([12, 12, 12, 12], "left")
  },
  D: {
    description: "Indicador estendido apontando para cima. Polegar e demais dedos curvados encostando as pontas.",
    direction: "Estático",
    svg: makeHandSign([24, 0, 0, 0], "center")
  },
  E: {
    description: "Dedos dobrados pelas falanges com as pontas tocando levemente a parte superior do polegar dobrado horizontalmente.",
    direction: "Estático",
    svg: makeHandSign([4, 4, 4, 4], "tucked")
  },
  F: {
    description: "Mão estendida, com o indicador dobrado em noventa graus, e o polegar apoiado verticalmente na face externa do indicador.",
    direction: "Estático",
    svg: makeHandSign([0, 24, 24, 24], "left")
  },
  G: {
    description: "Mão fechada, com indicador e polegar estendidos e paralelos apontando para cima.",
    direction: "Estático",
    svg: makeHandSign([22, 0, 0, 0], "left")
  },
  H: {
    description: "Indicador e médio estendidos com o polegar entre eles. Realizar um movimento de rotação do pulso de 180 graus.",
    direction: "Rotação horizontal",
    svg: makeHandSign([22, 22, 0, 0], "center", "circle")
  },
  I: {
    description: "Mão fechada, apenas o dedo mínimo (mindinho) estendido apontando para cima.",
    direction: "Estático",
    svg: makeHandSign([0, 0, 0, 20], "tucked")
  },
  J: {
    description: "Com o mindinho estendido da letra I, desenhar o formato da letra 'J' no ar de cima para baixo.",
    direction: "Movimento em gancho",
    svg: makeHandSign([0, 0, 0, 20], "tucked", "up")
  },
  K: {
    description: "Mesma configuração da letra H (indicador e médio estendidos com polegar entre eles), mas movendo a mão para cima.",
    direction: "Movimento para cima",
    svg: makeHandSign([22, 22, 0, 0], "center", "up")
  },
  L: {
    description: "Indicador apontado para cima e o polegar estendido para o lado, formando um ângulo de 90 graus imitando a letra L.",
    direction: "Estático",
    svg: makeHandSign([24, 0, 0, 0], "left")
  },
  M: {
    description: "Indicador, médio e anelar dobrados apontando para baixo por cima da palma fechada.",
    direction: "Estático",
    svg: makeHandSign([-18, -18, -18, 0], "tucked")
  },
  N: {
    description: "Indicador e médio dobrados apontando para baixo por cima da palma fechada.",
    direction: "Estático",
    svg: makeHandSign([-18, -18, 0, 0], "tucked")
  },
  O: {
    description: "Dedos dobrados tocando o polegar, formando um círculo oval imitando a letra 'O'.",
    direction: "Estático",
    svg: makeHandSign([6, 6, 6, 6], "center")
  },
  P: {
    description: "Configuração do H (indicador e médio estendidos com o polegar apoiado no meio), mas sustentado horizontalmente apontando para a frente.",
    direction: "Estático horizontal",
    svg: makeHandSign([18, 18, 0, 0], "center")
  },
  Q: {
    description: "Mesmo formato da letra G (indicador e polegar estendidos), mas apontando diretamente para baixo.",
    direction: "Estático para baixo",
    svg: makeHandSign([-20, 0, 0, 0], "left")
  },
  R: {
    description: "Indicador e médio estendidos e cruzados um sobre o outro. Outros dedos fechados.",
    direction: "Estático",
    svg: makeHandSign([24, 24, 0, 0], "tucked") // Crossed representation
  },
  S: {
    description: "Mão fechada em punho com o polegar cruzado horizontalmente pela frente de todos os dedos.",
    direction: "Estático",
    svg: makeHandSign([0, 0, 0, 0], "tucked")
  },
  T: {
    description: "Mesmo formato do F (indicador dobrado e polegar apoiado), mas com o polegar colocado por TRÁS do dedo indicador.",
    direction: "Estático",
    svg: makeHandSign([0, 24, 24, 24], "tucked")
  },
  U: {
    description: "Indicador e médio estendidos para cima e bem juntos. Outros dedos e polegar fechados.",
    direction: "Estático",
    svg: makeHandSign([24, 24, 0, 0], "tucked")
  },
  V: {
    description: "Indicador e médio estendidos para cima e afastados, imitando o símbolo de vitória ou formato de 'V'.",
    direction: "Estático",
    svg: makeHandSign([24, 24, 0, 0], "tucked")
  },
  W: {
    description: "Indicador, médio e anelar estendidos para cima e ligeiramente afastados, formando a letra 'W'.",
    direction: "Estático",
    svg: makeHandSign([24, 24, 24, 0], "tucked")
  },
  X: {
    description: "Indicador flexionado em formato de gancho. Puxar a mão rapidamente em direção ao corpo.",
    direction: "Movimento de tração",
    svg: makeHandSign([12, 0, 0, 0], "tucked", "up")
  },
  Y: {
    description: "Polegar e mindinho estendidos lateralmente, demais dedos dobrados. Fazer um movimento oscilante para cima.",
    direction: "Movimento ondulado",
    svg: makeHandSign([0, 0, 0, 22], "left", "circle")
  },
  Z: {
    description: "Com o indicador estendido, desenhar a letra 'Z' de forma imaginária no ar à sua frente.",
    direction: "Movimento de desenho",
    svg: makeHandSign([24, 0, 0, 0], "tucked", "circle")
  }
};
