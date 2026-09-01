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

  it("uses a unique heading id for each proposal detail", () => {
    expect(homeSource).toContain("aria-labelledby={`theme-detail-title-${theme.number}`}");
    expect(homeSource).toContain("id={`theme-detail-title-${theme.number}`}");
  });
});
