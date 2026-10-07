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
    keywords: "letras diferentes, gerador de fontes, letras bonitas, copiar e colar fontes, fontes para instagram, nicks free fire, letras personalizadas",
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
    description: "Crie nicks para Free Fire com símbolos, espaços invisíveis e combinações decorativas prontas para copiar.",
    keywords: "nicks free fire, simbolos ff, nomes para free fire, espaco invisivel ff, gerador de nick, nicks masculinos ff",
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
  const links = routes
    .filter((item) => item.slug !== route.slug)
    .slice(0, 9)
    .map((item) => `<a href="/${item.slug}" style="color:#4F46E5;text-decoration:none;font-weight:700">${escapeHtml(item.h1)}</a>`)
    .join(" · ");

  return `
    <div style="min-height:100vh;background:#F8FAFC;color:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:20px">
      <header style="max-width:1100px;margin:0 auto;padding:14px 0;border-bottom:1px solid #E2E8F0">
        <a href="/" style="color:#0F172A;text-decoration:none;font-weight:900">LetraDiferentes.org</a>
      </header>
      <main style="max-width:900px;margin:48px auto;background:#fff;border:1px solid #E2E8F0;border-radius:24px;padding:32px">
        <h1 style="font-size:32px;line-height:1.15;margin:0 0 14px">${escapeHtml(route.h1)}</h1>
        <p style="font-size:16px;line-height:1.7;color:#475569;margin:0 0 20px">${escapeHtml(route.summary)}</p>
        <p style="font-size:14px;line-height:1.7;color:#64748B">A ferramenta interativa completa é carregada no navegador e processa as entradas localmente quando aplicável.</p>
        <nav aria-label="Ferramentas relacionadas" style="margin-top:28px;padding-top:20px;border-top:1px solid #E2E8F0;font-size:13px;line-height:2">${links}</nav>
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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
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
        isPartOf: { "@id": `${baseUrl}/#website` }
      }
    ]
  };

  html = html.replace(
    "</head>",
    `    <script id="static-seo-jsonld" type="application/ld+json">${JSON.stringify(structuredData)}</script>\n  </head>`
  );

  const rootStart = html.indexOf('<div id="root">');
  const scriptStart = html.indexOf('<script type="module"', rootStart);
  if (rootStart === -1 || scriptStart === -1) {
    throw new Error(`Could not locate root/script markers for route ${route.slug || "/"}`);
  }
  html = html.slice(0, rootStart) + `<div id="root">${staticFallback(route)}</div>\n    ` + html.slice(scriptStart);

  const outputPath = route.slug
    ? path.join(distDir, route.slug, "index.html")
    : indexPath;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html, "utf8");
}

console.log(`Generated ${routes.length} crawlable HTML routes.`);
