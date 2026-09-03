import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("Desafio dos municípios", () => {
  it("mantém a fonte oficial e valida os 167 municípios", () => {
    expect(homeSource).toContain("servicodados.ibge.gov.br/api/v1/localidades/estados/24/municipios");
    expect(homeSource).toContain("data.length !== 167");
  });

  it("oferece recuperação quando a lista falha", () => {
    expect(homeSource).toContain("municipiosError");
    expect(homeSource).toContain("Tentar carregar municípios");
    expect(homeSource).toContain("setMunicipiosAttempt(value => value + 1)");
  });

  it("usa três minutos e identifica a secção como Desafio", () => {
    expect(homeSource).toContain("setTimeLeft(180)");
    expect(homeSource).toContain("<SectionEyebrow>Desafio</SectionEyebrow>");
  });
});
