import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  throw new Error("dist/index.html not found. Run vite build before generating static routes.");
}

const sourceHtml = fs.readFileSync(indexPath, "utf8");

const routes = [
  {
    slug: "",
    title: "Letras Diferentes - Gerador de Fontes e Letras Bonitas",
    description: "Gerador gratuito de letras diferentes e bonitas para copiar e colar no Instagram, TikTok, WhatsApp, Free Fire e outras plataformas.",
    keywords: "letras diferentes, gerador de fontes, conversor de letras, letras bonitas, copiar e colar fontes, fontes para instagram, nicks free fire, letras personalizadas",
    h1: "Letras Diferentes e Fontes Bonitas",
    summary: "Digite seu texto e transforme-o em dezenas de estilos Unicode e decorações para copiar, comparar e usar em perfis, bios, legendas e nicks."
  },
  {
    slug: "tatuagem",
    title: "Letras para Tatuagem - Gerador de Fontes de Tatuagem Grátis",
    description: "Crie e visualize moldes de letras para tatuagem grátis. Escolha fontes góticas, cursivas e caligráficas para desenhar sua tattoo.",
    keywords: "letras para tatuagem, fontes de tatuagem, caligrafia para tatuagem, ideias de tatuagem escrita, simulador de tatuagem",
    h1: "Letras para Tatuagem",
    summary: "Teste textos em estilos de tatuagem, ajuste a composição visual e gere referências para impressão ou desenho."
  },
  {
    slug: "grafite",
    title: "Letras de Grafite - Gerador de Letras Estilosas Online",
    description: "Crie letras de grafite online com estilos urbanos, contornos e fundos personalizáveis para nomes e tags.",
    keywords: "letras de grafite, alfabeto de grafite, gerador de grafite, letras estilosas de rua, grafite online",
    h1: "Letras de Grafite",
    summary: "Monte tags e nomes em estilos inspirados em street art, personalize cores e exporte a composição em SVG."
  },
  {
    slug: "pequenas",
    title: "Letras Pequenas - Sobrescrito e Subscrito para Copiar",
    description: "Gere letras pequenas, sobrescritas e subscritas para nicks, bios, perfis e textos decorativos.",
    keywords: "letras pequenas, letras miudas, letra pequena nick, sobrescrito e subscrito, gerador de letra pequena",
    h1: "Letras Pequenas para Copiar",
    summary: "Converta texto em caracteres pequenos, sobrescritos e subscritos e combine símbolos para criar nicks e bios."
  },
  {
    slug: "moldes",
    title: "Moldes de Letras para Imprimir e Recortar - Grátis",
    description: "Crie moldes de letras para imprimir, recortar, pintar e usar em atividades escolares, EVA e artesanato.",
    keywords: "moldes de letras, molde de letra para imprimir, letras grandes para recortar, moldes eva, moldes de alfabeto",
    h1: "Moldes de Letras para Imprimir",
    summary: "Escolha letras, números e estilos de molde e prepare folhas para impressão em diferentes tamanhos."
  },
  {
    slug: "ff-nicks",
    title: "Nicks Free Fire - Símbolos e Apelidos Personalizados FF",
    description: "Crie nomes e nicks para Free Fire com letras diferentes, símbolos decorativos e espaços especiais. Copie combinações e teste a aceitação no jogo.",
    keywords: "nicks free fire, gerador de nomes para free fire, letras para free fire, simbolos ff, nomes para free fire, espaco invisivel ff, gerador de nick",
    h1: "Nicks Free Fire e Símbolos",
    summary: "Combine nomes, símbolos e espaços especiais para montar apelidos de Free Fire e testar diferentes estilos."
  },
  {
    slug: "maiusculas",
    title: "Letras Maiúsculas e Minúsculas - Conversor de Texto Online",
    description: "Converta texto para maiúsculas, minúsculas, título, camelCase, snake_case e outros formatos online.",
    keywords: "letras maiusculas, caixa alta e baixa, conversor de texto, inverter maiusculas e minusculas, formatar texto",
    h1: "Conversor de Letras Maiúsculas e Minúsculas",
    summary: "Formate textos rapidamente em caixa alta, caixa baixa e diferentes convenções de escrita."
  },
  {
    slug: "libras",
    title: "Letras em Libras - Alfabeto Manual de Sinais",
    description: "Explore um recurso visual introdutório sobre o alfabeto manual em Libras e pratique a soletração de letras.",
    keywords: "letras em libras, alfabeto em libras, lingua brasileira de sinais, alfabeto manual libras, sinais de libras",
    h1: "Alfabeto Manual em Libras",
    summary: "Recurso visual introdutório para explorar letras e praticar soletração. Para aprendizado formal, consulte materiais especializados em Libras."
  },
  {
    slug: "termo-helper",
    title: "Termo Helper - Solucionador e Dicas do Jogo Termo",
    description: "Filtre palavras portuguesas de cinco letras usando posições confirmadas, letras presentes e letras descartadas.",
    keywords: "termo helper, solucionador termo, dicas jogo termo, resposta termo, wordle helper, decifrar termo",
    h1: "Termo Helper",
    summary: "Use pistas do jogo para reduzir combinações possíveis de palavras portuguesas de cinco letras."
  },
  {
    slug: "stop-respostas",
    title: "Respostas do Stop e Adedanha - Palavras de A a Z",
    description: "Consulte ideias de palavras por letra e categoria para jogar Stop, Adedanha e Adedonha.",
    keywords: "respostas stop, respostas adedanha, jogo de stop, palavras de a a z, dicionario stop, adedanha respostas",
    h1: "Respostas para Stop e Adedanha",
    summary: "Pesquise sugestões por letra e categoria e use a base como apoio durante partidas de Stop e Adedanha."
  },
  {
    slug: "sobre",
    title: "Sobre Nós - LetraDiferentes",
    description: "Conheça a proposta, os critérios de manutenção e os princípios editoriais do LetraDiferentes.org.",
    keywords: "sobre letradiferentes, quem somos, missao valores, equipe letradiferentes",
    h1: "Sobre o LetraDiferentes.org",
    summary: "Saiba como o portal organiza suas ferramentas, revisa conteúdo e trata limitações de compatibilidade."
  },
  {
    slug: "contato",
    title: "Contato e Suporte - LetraDiferentes",
    description: "Entre em contato com o LetraDiferentes.org para enviar feedback, reportar problemas ou sugerir melhorias.",
    keywords: "contato letradiferentes, falar conosco, suporte, sugestoes de fontes",
    h1: "Contato e Suporte",
    summary: "Use o canal de contato para enviar feedback, relatar bugs e sugerir novas ferramentas."
  },
  {
    slug: "privacidade",
    title: "Política de Privacidade - LetraDiferentes",
    description: "Consulte como o LetraDiferentes.org trata preferências locais, cookies, publicidade e privacidade.",
    keywords: "politica de privacidade, termos lgpd, seguranca de dados, cookies",
    h1: "Política de Privacidade",
    summary: "Informações sobre armazenamento local, cookies, publicidade e práticas de privacidade do site."
  },
  {
    slug: "termos",
    title: "Termos de Serviço - LetraDiferentes",
    description: "Leia os termos de uso das ferramentas gratuitas disponibilizadas pelo LetraDiferentes.org.",
    keywords: "termos de servico, termos de uso, condicoes gerais, licenca gratuita",
    h1: "Termos de Serviço",
    summary: "Condições gerais para o uso das ferramentas e conteúdos disponibilizados pelo portal."
  }
];

const staticGuides = {
  "": [
    {
      heading: "Como funciona o gerador de letras diferentes",
      body: "O gerador transforma letras e números comuns em variantes Unicode e efeitos decorativos diretamente no navegador. Você pode digitar um nome, frase, bio ou nick, comparar os resultados e copiar apenas o estilo que preferir."
    },
    {
      heading: "Onde usar letras bonitas e fontes estilizadas",
      body: "Os resultados podem ser testados em bios, legendas, mensagens e nomes de perfil no Instagram, TikTok, WhatsApp e jogos. A aparência e a aceitação de alguns caracteres variam conforme a fonte, o sistema e as regras de cada plataforma."
    }
  ],
  tatuagem: [
    {
      heading: "Como criar letras para tatuagem",
      body: "Digite a palavra ou frase, escolha um estilo visual e ajuste tamanho, espaçamento, curvatura e composição. A ferramenta serve para explorar referências de lettering antes de conversar com o tatuador sobre o desenho final."
    },
    {
      heading: "Prévia e exportação",
      body: "A composição pode ser preparada para visualização e exportação em SVG. O resultado é uma referência gráfica; proporção, legibilidade e aplicação sobre a pele devem ser avaliadas por um profissional antes da tatuagem definitiva."
    }
  ],
  grafite: [
    {
      heading: "Como montar letras de grafite online",
      body: "Use o editor para criar uma tag ou nome, testar estilos urbanos, alterar cores, contornos, espaçamento e fundos. A prévia ajuda a comparar composições antes de exportar o desenho."
    },
    {
      heading: "SVG para continuar editando",
      body: "A ferramenta permite gerar uma composição vetorial em SVG, formato útil para impressão e edição em programas compatíveis. O visual final pode variar de acordo com a fonte disponível no dispositivo."
    }
  ],
  pequenas: [
    {
      heading: "Letras pequenas, sobrescrito e subscrito",
      body: "O conversor combina caracteres Unicode que lembram letras menores acima ou abaixo da linha normal. É útil para nicks, bios, marcações curtas e textos decorativos que precisam ser copiados e colados."
    },
    {
      heading: "Limites de compatibilidade",
      body: "Nem todas as letras possuem uma versão Unicode de sobrescrito ou subscrito equivalente. Por isso, alguns caracteres podem permanecer no formato normal ou usar a alternativa visual mais próxima."
    }
  ],
  moldes: [
    {
      heading: "Moldes de letras para imprimir",
      body: "Escolha uma letra, palavra, número ou símbolo, ajuste o estilo e prepare o conteúdo para impressão. Os moldes podem apoiar cartazes, trabalhos escolares, pintura, recorte, EVA e outros projetos manuais."
    },
    {
      heading: "Antes de imprimir",
      body: "Confira o tamanho do papel, margens e escala na prévia de impressão. Para projetos que exigem medidas exatas, faça um teste em uma folha antes de produzir várias cópias."
    }
  ],
  "ff-nicks": [
    {
      heading: "Gerador de nicks para Free Fire",
      body: "Combine um nome-base com símbolos, molduras, letras estilizadas e espaços especiais para criar variações de nick. Os resultados podem ser copiados individualmente e testados no jogo."
    },
    {
      heading: "Símbolos aceitos podem variar",
      body: "Jogos podem limitar tamanho, caracteres e símbolos permitidos, e essas regras podem mudar. Se um nick não for aceito, teste uma versão mais curta ou remova caracteres decorativos."
    }
  ],
  maiusculas: [
    {
      heading: "Conversor de maiúsculas e minúsculas",
      body: "Transforme textos entre caixa alta, caixa baixa, título, frase e formatos usados em programação, como camelCase, PascalCase, snake_case e kebab-case."
    },
    {
      heading: "Formatação feita no navegador",
      body: "O texto é processado localmente quando você usa o conversor. Isso torna a ferramenta útil para revisar títulos, listas, nomes de arquivos, identificadores e pequenos blocos de texto."
    }
  ],
  libras: [
    {
      heading: "Alfabeto manual em Libras",
      body: "Esta página oferece um recurso visual introdutório para explorar letras e praticar soletração manual. Ela não substitui aulas, dicionários especializados, intérpretes ou materiais produzidos por profissionais e pela comunidade surda."
    },
    {
      heading: "Use como apoio introdutório",
      body: "Libras é uma língua completa, com gramática e vocabulário próprios, e não uma simples substituição letra por letra do português. A soletração manual é apenas uma parte do aprendizado."
    }
  ],
  "termo-helper": [
    {
      heading: "Como filtrar palavras de cinco letras",
      body: "Informe letras confirmadas, letras presentes em outra posição e letras que não aparecem na palavra. O filtro reduz a lista de combinações possíveis e ajuda a organizar as próximas tentativas."
    },
    {
      heading: "A lista é uma ferramenta de apoio",
      body: "A base de palavras pode não conter todas as formas aceitas por cada jogo. Use os resultados como candidatos e confirme a palavra diretamente no Termo, Letreco ou jogo equivalente."
    }
  ],
  "stop-respostas": [
    {
      heading: "Palavras para Stop e Adedanha",
      body: "Escolha uma letra e consulte sugestões separadas por categorias para ampliar o repertório durante partidas de Stop, Adedanha e Adedonha."
    },
    {
      heading: "Combine pesquisa e repertório próprio",
      body: "Algumas categorias dependem das regras adotadas pelo grupo. Antes da rodada, combine critérios de validade para nomes próprios, marcas, variações regionais e palavras pouco comuns."
    }
  ],
  sobre: [
    {
      heading: "Como o portal é mantido",
      body: "O LetraDiferentes.org reúne ferramentas de texto, símbolos, jogos de palavras e recursos visuais. As páginas são revisadas quando problemas de funcionamento, compatibilidade ou clareza são identificados."
    }
  ],
  contato: [
    {
      heading: "Feedback, bugs e sugestões",
      body: "O canal de contato pode ser usado para relatar erros reproduzíveis, sugerir novos estilos ou enviar observações sobre compatibilidade. O formulário prepara uma mensagem para ser concluída no aplicativo de e-mail do usuário."
    }
  ],
  privacidade: [
    {
      heading: "Preferências e armazenamento local",
      body: "Algumas ferramentas usam armazenamento local do navegador para manter favoritos, histórico ou configurações no próprio dispositivo. A política explica também o uso potencial de cookies e tecnologias de publicidade."
    }
  ],
  termos: [
    {
      heading: "Condições de uso",
      body: "Os termos descrevem as condições gerais para acessar e utilizar as ferramentas gratuitas do portal, incluindo limitações de responsabilidade e regras aplicáveis ao conteúdo gerado."
    }
  ]
};

const relatedSlugs = {
  "": ["ff-nicks", "pequenas", "tatuagem", "grafite", "maiusculas", "moldes"],
  tatuagem: ["grafite", "moldes", "", "pequenas"],
  grafite: ["tatuagem", "moldes", "", "ff-nicks"],
  pequenas: ["", "ff-nicks", "maiusculas", "tatuagem"],
  moldes: ["tatuagem", "grafite", "maiusculas", "libras"],
  "ff-nicks": ["", "pequenas", "maiusculas", "grafite"],
  maiusculas: ["", "pequenas", "moldes", "stop-respostas"],
  libras: ["moldes", "maiusculas", "", "stop-respostas"],
  "termo-helper": ["stop-respostas", "maiusculas", "", "pequenas"],
  "stop-respostas": ["termo-helper", "maiusculas", "", "libras"],
  sobre: ["", "contato"],
  contato: ["sobre", ""],
  privacidade: ["termos", "sobre"],
  termos: ["privacidade", "sobre"]
};

const toolSlugs = new Set(["", "tatuagem", "grafite", "pequenas", "moldes", "ff-nicks", "maiusculas", "libras", "termo-helper", "stop-respostas"]);

const baseUrl = "https://letradiferentes.org";

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function replaceMeta(html, selector, value) {
  const escaped = escapeHtml(value);
  const patterns = selector.type === "name"
    ? [
        new RegExp(`<meta\\s+name=["']${selector.key}["']\\s+content=["'][^"']*["']\\s*/?>`, "i"),
        new RegExp(`<meta\\s+content=["'][^"']*["']\\s+name=["']${selector.key}["']\\s*/?>`, "i")
      ]
    : [
        new RegExp(`<meta\\s+property=["']${selector.key}["']\\s+content=["'][^"']*["']\\s*/?>`, "i"),
        new RegExp(`<meta\\s+content=["'][^"']*["']\\s+property=["']${selector.key}["']\\s*/?>`, "i")
      ];

  for (const pattern of patterns) {
    if (pattern.test(html)) {
      const attr = selector.type === "name" ? "name" : "property";
      return html.replace(pattern, `<meta ${attr}="${selector.key}" content="${escaped}" />`);
    }
  }

  const attr = selector.type === "name" ? "name" : "property";
  return html.replace("</head>", `    <meta ${attr}="${selector.key}" content="${escaped}" />\n  </head>`);
}

function replaceCanonical(html, url) {
  const tag = `<link rel="canonical" href="${url}" />`;
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    return html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, tag);
  }
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function replaceAlternate(html, hreflang, url) {
  const pattern = new RegExp(`<link\\s+rel=["']alternate["'][^>]*hreflang=["']${hreflang}["'][^>]*>`, "i");
  const tag = `<link rel="alternate" hreflang="${hreflang}" href="${url}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function staticFallback(route) {
  const related = (relatedSlugs[route.slug] || [])
    .map((slug) => routes.find((item) => item.slug === slug))
    .filter(Boolean);

  const links = related
    .map((item) => {
      const href = item.slug ? `/${item.slug}` : "/";
      return `<a href="${href}" style="display:block;color:#4F46E5;text-decoration:none;font-weight:700;padding:10px 12px;border:1px solid #E2E8F0;border-radius:12px;background:#fff">${escapeHtml(item.h1)}</a>`;
    })
    .join("");

  const guideSections = (staticGuides[route.slug] || [])
    .map((section) => `
      <section style="margin-top:26px">
        <h2 style="font-size:20px;line-height:1.3;margin:0 0 8px;color:#0F172A">${escapeHtml(section.heading)}</h2>
        <p style="font-size:14px;line-height:1.8;color:#475569;margin:0">${escapeHtml(section.body)}</p>
      </section>`)
    .join("");

  return `
    <div style="min-height:100vh;background:#F8FAFC;color:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:20px">
      <header style="max-width:1100px;margin:0 auto;padding:14px 0;border-bottom:1px solid #E2E8F0">
        <a href="/" style="color:#0F172A;text-decoration:none;font-weight:900">LetraDiferentes.org</a>
      </header>
      <main style="max-width:900px;margin:48px auto;background:#fff;border:1px solid #E2E8F0;border-radius:24px;padding:32px">
        <h1 style="font-size:32px;line-height:1.15;margin:0 0 14px">${escapeHtml(route.h1)}</h1>
        <p style="font-size:16px;line-height:1.7;color:#475569;margin:0 0 20px">${escapeHtml(route.summary)}</p>
        <p style="font-size:14px;line-height:1.7;color:#64748B">A interface interativa completa é carregada no navegador. Quando aplicável, a transformação do texto e as preferências da ferramenta são processadas localmente no dispositivo.</p>
        ${guideSections}
        <aside style="margin-top:30px;padding-top:22px;border-top:1px solid #E2E8F0">
          <h2 style="font-size:18px;margin:0 0 12px">Ferramentas relacionadas</h2>
          <nav aria-label="Ferramentas relacionadas" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px">${links}</nav>
        </aside>
      </main>
    </div>`;
}

for (const route of routes) {
  const url = route.slug ? `${baseUrl}/${route.slug}` : `${baseUrl}/`;
  let html = sourceHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = replaceMeta(html, { type: "name", key: "description" }, route.description);
  html = replaceMeta(html, { type: "name", key: "keywords" }, route.keywords);
  html = replaceMeta(html, { type: "property", key: "og:title" }, route.title);
  html = replaceMeta(html, { type: "property", key: "og:description" }, route.description);
  html = replaceMeta(html, { type: "property", key: "og:url" }, url);
  html = replaceMeta(html, { type: "name", key: "twitter:title" }, route.title);
  html = replaceMeta(html, { type: "name", key: "twitter:description" }, route.description);
  html = replaceMeta(html, { type: "name", key: "twitter:url" }, url);
  html = replaceCanonical(html, url);
  html = replaceAlternate(html, "pt", url);
  html = replaceAlternate(html, "x-default", url);

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "LetraDiferentes",
      url: `${baseUrl}/`,
      inLanguage: "pt-BR"
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: "pt-BR",
      dateModified: "2026-10-07",
      isPartOf: { "@id": `${baseUrl}/#website` }
    }
  ];

  if (route.slug) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: `${baseUrl}/`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: route.h1,
          item: url
        }
      ]
    });
  }

  if (toolSlugs.has(route.slug)) {
    graph.push({
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: route.h1,
      url,
      description: route.description,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      inLanguage: "pt-BR"
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  html = html.replace(
    "</head>",
    `    <script id="static-seo-jsonld" type="application/ld+json">${JSON.stringify(structuredData)}</script>\n  </head>`
  );

  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.lastIndexOf("</body>");
  if (rootStart === -1 || bodyEnd === -1 || bodyEnd <= rootStart) {
    throw new Error(`Could not locate root/body markers for route ${route.slug || "/"}`);
  }
  html = html.slice(0, rootStart) + `<div id="root">${staticFallback(route)}</div>\n  ` + html.slice(bodyEnd);

  const outputPath = route.slug
    ? path.join(distDir, route.slug, "index.html")
    : indexPath;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html, "utf8");
}

console.log(`Generated ${routes.length} crawlable HTML routes.`);
