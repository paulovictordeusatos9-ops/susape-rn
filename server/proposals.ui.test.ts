import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("proposal detail rendering", () => {
  it("mounts the detail panel from the selected theme card", () => {
    const themesMapStart = homeSource.indexOf("{themes.map(theme => (");
    const themesMapEnd = homeSource.indexOf("              </article>\n            ))}", themesMapStart);
    const detailCondition = "{selectedThemeNumber === theme.number && (";

    expect(themesMapStart).toBeGreaterThan(-1);
    expect(themesMapEnd).toBeGreaterThan(themesMapStart);
    expect(homeSource.slice(themesMapStart, themesMapEnd)).toContain(detailCondition);
    expect(homeSource).not.toContain("{selectedTheme && (");
  });

  it("keeps an accessible detail label without repeating the theme heading", () => {
    expect(homeSource).toContain("aria-label={`Detalhe da proposta ${theme.number}: ${theme.title}`}");
    expect(homeSource).not.toContain("<h3 id={`theme-detail-title-${theme.number}`}>{theme.title}</h3>");
  });

  it("contains complete proposal copy and a scrollable detail copy region", () => {
    expect(homeSource).toContain("Fortalecer o turismo em todo o Estado.");
    expect(homeSource).toContain("Projetos que afastem nossos jovens da violência e das drogas.");
    expect(homeSource).toContain("Redução das filas para consultas, exames e cirurgias.");
    expect(homeSource).toContain("Expansão da energia solar e eólica.");
    expect(homeSource).toContain('className="theme-detail-copy"');
  });
});
