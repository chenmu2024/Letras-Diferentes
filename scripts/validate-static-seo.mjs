import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const baseUrl = "https://letradiferentes.org";
const routes = [
  "",
  "tatuagem",
  "grafite",
  "pequenas",
  "moldes",
  "ff-nicks",
  "maiusculas",
  "libras",
  "termo-helper",
  "stop-respostas",
  "sobre",
  "contato",
  "privacidade",
  "termos",
];

const titles = new Set();

for (const slug of routes) {
  const file = slug
    ? path.resolve("dist", slug, "index.html")
    : path.resolve("dist", "index.html");

  assert.ok(fs.existsSync(file), `Missing generated route: /${slug}`);
  const html = fs.readFileSync(file, "utf8");
  const expectedUrl = slug ? `${baseUrl}/${slug}` : `${baseUrl}/`;

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  assert.ok(title, `Missing title on /${slug}`);
  assert.ok(!titles.has(title), `Duplicate title detected: ${title}`);
  titles.add(title);

  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1];
  assert.ok(description && description.length >= 70, `Missing or thin meta description on /${slug}`);

  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  assert.equal(canonical, expectedUrl, `Wrong canonical on /${slug}`);

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  assert.equal(h1Count, 1, `Expected exactly one H1 on /${slug}, found ${h1Count}`);

  const jsonLdMatch = html.match(/<script id=["']static-seo-jsonld["'] type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  assert.ok(jsonLdMatch, `Missing static JSON-LD on /${slug}`);
  const jsonLd = JSON.parse(jsonLdMatch[1]);
  assert.equal(jsonLd["@context"], "https://schema.org", `Invalid JSON-LD context on /${slug}`);

  const graph = jsonLd["@graph"];
  assert.ok(Array.isArray(graph), `Missing JSON-LD graph on /${slug}`);
  assert.ok(graph.some((node) => node["@type"] === "WebPage" && node.url === expectedUrl), `Missing WebPage schema on /${slug}`);

  if (slug) {
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList"), `Missing BreadcrumbList on /${slug}`);
  }

  assert.ok(/<script[^>]+src=["'][^"']+\.js["']/i.test(html), `Built JavaScript entry missing on /${slug}`);
  assert.ok(!html.includes("pub-0000000000000000"), `Placeholder AdSense publisher ID leaked on /${slug}`);
}

console.log(`Validated SEO output for ${routes.length} generated routes.`);
