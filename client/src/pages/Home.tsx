/**
 * Atualização baseada no Manual de Identidade Visual SUSAPE 1234.
 * Cada bloco deve levar a uma ação concreta e nunca substituir factos verificados por ficção.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  ExternalLink,
  Facebook,
  Flag,
  HeartHandshake,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  Sun,
  Wind,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Municipio = {
  id: number;
  nome: string;
  "regiao-imediata"?: {
    "regiao-intermediaria"?: { nome?: string };
  };
};

type Coordinate = [number, number];
type GeoGeometry =
  | { type: "Polygon"; coordinates: Coordinate[][] }
  | { type: "MultiPolygon"; coordinates: Coordinate[][][] };
type GeoFeature = { type: "Feature"; geometry: GeoGeometry };
type GeoFeatureCollection = { type: "FeatureCollection"; features: GeoFeature[] };

const IBGE_MUNICIPIOS_URL =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados/24/municipios";
const IBGE_RN_SHAPE_URL =
  "https://servicodados.ibge.gov.br/api/v3/malhas/estados/24?intrarregiao=municipio&formato=application/vnd.geo+json&qualidade=intermediaria";
const ibgeMunicipioShapeUrl = (id: number) =>
  `https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${id}?formato=application/vnd.geo+json&qualidade=intermediaria`;

function geometryRings(geometry: GeoGeometry): Coordinate[][] {
  return geometry.type === "Polygon" ? geometry.coordinates : geometry.coordinates.flat();
}

function geometryToPath(geometry: GeoGeometry, project: (point: Coordinate) => string) {
  return geometryRings(geometry)
    .map(ring => ring.map((point, index) => `${index === 0 ? "M" : "L"}${project(point)}`).join(" ") + " Z")
    .join(" ");
}

const heroPortrait = "/manus-storage/susape-hero-flag-cutout_68f7954f.png";
const identityPortrait = "/manus-storage/susape-hero-31-08-2026_9fec18c3.png";
const formationPortrait = "/manus-storage/formacao-susape_c4c8cb46.jpg";
const heroNumberDigits = [
  { digit: "1", className: "num-red" },
  { digit: "2", className: "num-green" },
  { digit: "3", className: "num-blue" },
  { digit: "4", className: "num-yellow" },
];
const galleryImages = [
  { src: "/manus-storage/galeria-01_34e2af54.webp", alt: "Susape Augusto em encontro com lideranças potiguares", caption: "Encontro e diálogo" },
  { src: "/manus-storage/galeria-02_0a9c9b22.webp", alt: "Susape Augusto em agenda com representantes locais", caption: "Construção de caminhos" },
  { src: "/manus-storage/galeria-03_89b05074.jpg", alt: "Susape Augusto fala ao público durante encontro político", caption: "Presença e participação" },
  { src: "/manus-storage/galeria-04_8b902bbf.jpg", alt: "Susape Augusto durante atividade partidária", caption: "Compromisso com o RN" },
  { src: "/manus-storage/galeria-05_35a64db0.jpg", alt: "Susape Augusto em reunião com integrantes do partido", caption: "União e trabalho" },
  { src: "/manus-storage/galeria-06_3e849a02.jpg", alt: "Susape Augusto com grupo em visita institucional", caption: "Agenda pelo Rio Grande do Norte" },
  { src: "/manus-storage/galeria-07_e4a11224.jpg", alt: "Susape Augusto em encontro diante de um mapa do Rio Grande do Norte", caption: "Diálogo sobre o território", wide: true },
];

const themes = [
  {
    number: "01",
    title: "Gosto de Ser Potiguar",
    body: "Valorizar a identidade, a cultura, a história, as potencialidades e o sentimento de pertencimento ao Rio Grande do Norte.",
    color: "theme-orgulho",
    plan: [
      "Valorizar a identidade potiguar em ações de cultura, memória e pertencimento, dando espaço às iniciativas que já existem no território.",
      "Defender editais, circulação de artistas e preservação do património como caminhos de oportunidade para jovens, grupos culturais e municípios.",
      "Acompanhar a aplicação dos recursos e publicar os compromissos assumidos, para que orgulho não seja apenas discurso, mas presença continuada.",
    ],
  },
  {
    number: "02",
    title: "Segurança Pública",
    body: "Defender proteção, integração, prevenção, tecnologia e cidadania, com presença do Estado e segurança para as famílias.",
    color: "theme-seguranca",
    plan: [
      "Priorizar prevenção e inteligência, aproximando as políticas de segurança das escolas, comunidades e serviços que conhecem a realidade de cada região.",
      "Defender integração entre forças, formação continuada e uso responsável de tecnologia, com proteção aos profissionais e respeito aos direitos das pessoas.",
      "Fiscalizar metas, atendimento e distribuição de recursos, acompanhando resultados por território em vez de esconder problemas atrás de números soltos.",
    ],
  },
  {
    number: "03",
    title: "Saúde Pública",
    body: "Saúde Pública mais perto de quem precisa. Propor atenção à infraestrutura, urgência, atenção básica e fortalecimento da rede regional dos municípios.",
    color: "theme-saude",
    plan: [
      "Defender uma rede regional mais coordenada, para que o cuidado comece perto de casa e o encaminhamento entre municípios seja mais simples.",
      "Buscar recursos para atenção básica, urgência e estrutura, com prioridade para reduzir esperas evitáveis e fortalecer quem trabalha na linha da frente.",
      "Acompanhar filas, manutenção e entrega dos serviços com transparência, ouvindo utentes e profissionais antes de propor novas soluções.",
    ],
  },
  {
    number: "04",
    title: "Sustentabilidade",
    body: "Aproveitar as riquezas naturais, culturais e económicas do RN com responsabilidade, oportunidades e preservação.",
    color: "theme-sustentavel",
    plan: [
      "Conciliar proteção ambiental e oportunidade económica, apoiando cadeias locais que gerem rendimento sem esgotar os recursos do território.",
      "Defender projetos de água, energia, saneamento, turismo responsável e inovação adaptados às diferenças entre litoral, agreste e sertão.",
      "Acompanhar licenças, investimentos e resultados com critérios claros, para que desenvolvimento seja medido pela vida das pessoas e pela preservação do futuro.",
    ],
  },
];

const perfil = [
  ["Identidade", "Orgulho potiguar", "O manual ancora a comunicação no orgulho de ser norte-rio-grandense."],
  ["Pessoas", "Pai e empreendedor", "Apresentação pessoal indicada no perfil público da candidatura."],
  ["Formação", "Superior completo", "Informação declarada na ficha pública da candidatura."],
  ["Caminhada", "Primeira disputa eleitoral", "Dado publicado por fonte de perfil eleitoral baseada em registos públicos."],
];

const news = [
  {
    tag: "Candidatura",
    title: "Susape Augusto concorre a deputado federal pelo RN",
    body: "PDT · 1234 · dados públicos em consulta eleitoral.",
    href: "https://agorarn.com.br/eleicoes-2026/candidatos/susape-augusto/",
  },
  {
    tag: "Manual",
    title: "A identidade SUSAPE 1234 ganha forma",
    body: "Cores vivas, símbolos do RN e o slogan Faz sentido?! organizam a nova referência visual.",
    href: "https://www.instagram.com/susapeaugusto/?hl=en",
  },
  {
    tag: "Conteúdo pendente",
    title: "[CONTEÚDO A SER FORNECIDO PELA CAMPANHA]",
    body: "Área preparada para receber título, data, imagem, texto, categoria e fonte oficial.",
    href: "#contato",
  },
];

function normalizar(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-eyebrow">
      <span />
      {children}
    </p>
  );
}

function SusapeWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`susape-wordmark ${className}`} role="img" aria-label="SUSAPE">
      <span aria-hidden="true">SUS</span>
      <span className="susape-wordmark-a" aria-hidden="true">
        <svg viewBox="0 0 60 90" focusable="false">
          <path d="M4 90 21 0h18l17 90H44l-4-21H20l-4 21H4Z" fill="currentColor" />
          <g className="susape-lighthouse">
            <path d="M23 67h15l-3-37H26l-3 37Z" />
            <path d="m23 29 7-10 7 10H23Z" />
            <path d="M20 68h21v5H20zM18 75h25v5H18z" />
            <rect x="28" y="35" width="5" height="6" fill="currentColor" />
            <rect x="28" y="48" width="5" height="7" fill="currentColor" />
            <path d="M30 15V8M20 20l-5-5M40 20l5-5" fill="none" stroke="var(--susape-symbol-color, #fff)" strokeWidth="2.1" strokeLinecap="round" />
          </g>
        </svg>
      </span>
      <span aria-hidden="true">PE</span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [rnShape, setRnShape] = useState<GeoFeature[]>([]);
  const [highlightedCities, setHighlightedCities] = useState<Municipio[]>([]);
  const [highlightedShapes, setHighlightedShapes] = useState<GeoFeature[]>([]);
  const [mapError, setMapError] = useState(false);
  const [ideaSent, setIdeaSent] = useState(false);
  const [profileIndex, setProfileIndex] = useState(0);
  const [quizActive, setQuizActive] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [used, setUsed] = useState<string[]>([]);
  const [quizFeedback, setQuizFeedback] = useState("");
  const activeProfile = perfil[profileIndex];
  const [selectedThemeNumber, setSelectedThemeNumber] = useState<string | null>(null);
  const selectedTheme = themes.find(theme => theme.number === selectedThemeNumber);

  const changeProfile = (direction: number) => {
    setProfileIndex(current => (current + direction + perfil.length) % perfil.length);
  };

  useEffect(() => {
    let active = true;
    fetch(IBGE_MUNICIPIOS_URL)
      .then(response => {
        if (!response.ok) throw new Error("IBGE indisponível");
        return response.json();
      })
      .then((data: Municipio[]) => {
        if (active) setMunicipios(data);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    fetch(IBGE_RN_SHAPE_URL)
      .then(response => {
        if (!response.ok) throw new Error("Malha do RN indisponível");
        return response.json() as Promise<GeoFeatureCollection>;
      })
      .then(data => {
        if (active) setRnShape(data.features || []);
      })
      .catch(() => active && setMapError(true));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    if (!highlightedCities.length) {
      setHighlightedShapes([]);
      return () => {
        active = false;
      };
    }
    Promise.all(
      highlightedCities.map(city =>
        fetch(ibgeMunicipioShapeUrl(city.id)).then(response => {
          if (!response.ok) throw new Error("Malha municipal indisponível");
          return response.json() as Promise<GeoFeatureCollection>;
        }),
      ),
    )
      .then(collections => {
        if (active) setHighlightedShapes(collections.flatMap(collection => collection.features || []));
      })
      .catch(() => active && setMapError(true));
    return () => {
      active = false;
    };
  }, [highlightedCities]);

  const mapProjection = useMemo(() => {
    const points = rnShape.flatMap(feature => geometryRings(feature.geometry).flat());
    if (!points.length) return (_point: Coordinate) => "0,0";
    const longitudes = points.map(point => point[0]);
    const latitudes = points.map(point => point[1]);
    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);
    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);
    const width = 800;
    const height = 560;
    const padding = 28;
    const scale = Math.min(
      (width - padding * 2) / Math.max(maxLongitude - minLongitude, 0.01),
      (height - padding * 2) / Math.max(maxLatitude - minLatitude, 0.01),
    );
    const offsetX = (width - (maxLongitude - minLongitude) * scale) / 2;
    const offsetY = (height - (maxLatitude - minLatitude) * scale) / 2;
    return ([longitude, latitude]: Coordinate) =>
      `${(offsetX + (longitude - minLongitude) * scale).toFixed(2)},${(height - offsetY - (latitude - minLatitude) * scale).toFixed(2)}`;
  }, [rnShape]);

  useEffect(() => {
    if (!quizActive) return;
    if (timeLeft === 0) {
      setQuizActive(false);
      setQuizFinished(true);
      return;
    }
    const timer = window.setTimeout(() => setTimeLeft(value => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [quizActive, timeLeft]);

  const startQuiz = () => {
    setTimeLeft(180);
    setScore(0);
    setAnswer("");
    setUsed([]);
    setHighlightedCities([]);
    setQuizFeedback("");
    setQuizFinished(false);
    setQuizActive(true);
  };

  const submitAnswer = (event: React.FormEvent) => {
    event.preventDefault();
    if (!quizActive || !answer.trim()) return;
    const city = municipios.find(item => normalizar(item.nome) === normalizar(answer));
    if (!city) {
      setQuizFeedback("Ainda não encontramos esse município no cadastro do IBGE. Tente outro nome.");
      return;
    }
    if (used.includes(city.nome)) {
      setQuizFeedback("Esse município já foi marcado. Escolha outro.");
      setAnswer("");
      return;
    }
    setUsed(previous => [city.nome, ...previous]);
    setHighlightedCities(previous => [...previous, city]);
    setScore(previous => previous + 1);
    setAnswer("");
    setQuizFeedback(`Resposta validada: ${city.nome}.`);
  };

  const nav = [
    ["Início", "#inicio"],
    ["Quem é Susape", "#quem-e"],
    ["Projeto", "#propostas"],
    ["Construção Coletiva", "#construcao"],
    ["Desafio", "#desafio"],
    ["Notícias", "#noticias"],
    ["Galeria", "#galeria"],
    ["Participe", "#participe"],
  ];

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Susape 1234 — início">
          <div className="brand-lockup">
            <span>DEPUTADO FEDERAL</span>
            <strong><SusapeWordmark className="susape-wordmark-header" /></strong>
            <div className="brand-number"><b className="num-red">1</b><b className="num-green">2</b><b className="num-blue">3</b><b className="num-yellow">4</b></div>
          </div>
        </a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Navegação principal">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contato">
          Contato <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(value => !value)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section id="inicio" className="hero hero-refresh hero-white-blue">
          <img className="hero-flag-banner" src="/manus-storage/bandeira-rio-grande-do-norte_68147e19.svg" alt="Bandeira do Rio Grande do Norte" />
          <div className="hero-visual">
            <div className="hero-number-central" aria-hidden="true">{heroNumberDigits.map(({ digit, className }, index) => <span key={`${digit}-central-${index}`} className={className}>{digit}</span>)}</div>
            <img className="hero-portrait" src={heroPortrait} alt="Susape Augusto, candidato a deputado federal pelo Rio Grande do Norte" />
          </div>
          <div className="hero-overlay" />
          <div className="hero-content">
          <div className="hero-copy">
              <div className="hero-identification-below" aria-label="Candidato a Deputado Federal Susape 1234">
                <span>CANDIDATO A DEPUTADO FEDERAL</span>
                <strong><SusapeWordmark className="susape-wordmark-hero" /> <b className="num-red">1</b><b className="num-green">2</b><b className="num-blue">3</b><b className="num-yellow">4</b></strong>
              </div>
              <h1>ORGULHO DE SER NORTE-RIO-GRANDENSE.</h1>
              <p className="hero-summary">
              Susape Augusto é candidato a deputado federal pelo Rio Grande do Norte. Um Rio Grande do Norte mais justo, criativo, saudável, educado e inclusivo.
            </p>
              <div className="hero-actions">
                <a className="button-primary" href="#quem-e">
                  Conheça a trajetória <ArrowDownRight size={19} />
                </a>
                <a className="button-ghost" href="#construcao">
                  Traga uma ideia <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="potiguar-strip" aria-label="Elementos gráficos da identidade potiguar">
          <div className="potiguar-strip-track">
            <span className="strip-red"><Sun size={17} /> Sol</span>
            <span className="strip-blue"><Wind size={17} /> Vento</span>
            <span className="strip-green"><Compass size={17} /> Mapa do RN</span>
            <span className="strip-yellow"><Flag size={17} /> Gente</span>
            <span className="strip-pink"><HeartHandshake size={17} /> Cultura</span>
            <span className="strip-red"><Sun size={17} /> Sol</span>
            <span className="strip-blue"><Wind size={17} /> Vento</span>
          </div>
        </section>

        <section id="quem-e" className="section profile-section identity-section">
          <div className="section-stamp" aria-hidden="true"><span>01</span></div>
          <div className="section-intro split-heading">
            <div>
              <SectionEyebrow>Quem é Susape</SectionEyebrow>
              <h2>Uma trajetória apresentada com os pés no chão.</h2>
            </div>
            <p>
              Natural de Natal, com ensino superior completo, Susape Augusto se apresenta como cristão, empreendedor, pai e potiguar. A candidatura é ao cargo de deputado federal pelo Rio Grande do Norte.
            </p>
          </div>
          <div className="profile-grid">
            <div className="profile-statement">
              <span className="statement-mark">“</span>
              <p>Política olhando para as pessoas, ouvindo mais e construindo soluções que façam sentido.</p>
              <small>— síntese da mensagem pública de apresentação da candidatura</small>
            </div>
            <div className="profile-carousel" aria-label="Etapas da trajetória de Susape">
              <div className="profile-carousel-main">
                <div className="profile-carousel-topline">
                  <div>
                    <span className="profile-carousel-index">0{profileIndex + 1}</span>
                    <span className="profile-carousel-kicker">etapa da trajetória</span>
                  </div>
                  <div className="profile-carousel-controls" aria-label="Navegação das etapas">
                    <button type="button" onClick={() => changeProfile(-1)} aria-label="Etapa anterior"><ChevronLeft size={18} /></button>
                    <button type="button" onClick={() => changeProfile(1)} aria-label="Próxima etapa"><ChevronRight size={18} /></button>
                  </div>
                </div>
                <article className="profile-carousel-card" aria-live="polite">
                  <div className="profile-card-heading">
                    <div>
                      <span>{activeProfile[0]}</span>
                      <h3>{activeProfile[1]}</h3>
                    </div>
                    {(profileIndex === 0 || profileIndex === 2) && (
                      <img
                        className={`profile-stage-photo ${profileIndex === 0 ? "profile-stage-photo-identity" : "profile-stage-photo-formation"}`}
                        src={profileIndex === 0 ? identityPortrait : formationPortrait}
                        alt={profileIndex === 0 ? "Susape Augusto, fotografia da etapa Identidade" : "Susape Augusto, fotografia da etapa Formação"}
                      />
                    )}
                  </div>
                  <p>{activeProfile[2]}</p>
                </article>
              </div>
              <div className="profile-carousel-rail" role="tablist" aria-label="Selecionar etapa da trajetória">
                {perfil.map(([eyebrow], index) => (
                  <button
                    key={eyebrow}
                    type="button"
                    role="tab"
                    aria-selected={profileIndex === index}
                    className={profileIndex === index ? "active" : ""}
                    onClick={() => setProfileIndex(index)}
                  >
                    <span>0{index + 1}</span>
                    <small>{eyebrow}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="source-note">
            Informações conferidas em <a href="https://agorarn.com.br/eleicoes-2026/candidatos/susape-augusto/" target="_blank" rel="noreferrer">fichas públicas de candidatura</a> e no <a href="https://www.instagram.com/susapeaugusto/?hl=en" target="_blank" rel="noreferrer">perfil público indexado</a>.
          </p>
        </section>

        <section id="projeto" className="section project-section identity-section">
          <div className="section-stamp rail-light" aria-hidden="true"><span>02</span></div>
          <div className="project-topline">
            <div>
              <SectionEyebrow>Conheça o projeto</SectionEyebrow>
              <h2>Quatro eixos para um jeito potiguar de fazer.</h2>
            </div>
            <p>As propostas abaixo traduzem os temas definidos no briefing da campanha. A linguagem respeita a atuação parlamentar: defender, propor, fiscalizar, articular e buscar recursos, sem prometer execução direta.</p>
          </div>
          <div className="theme-grid" id="propostas">
            {themes.map(theme => (
              <article
                className={`theme-card ${theme.color}`}
                key={theme.number}
                role="button"
                tabIndex={0}
                aria-expanded={selectedThemeNumber === theme.number}
                onClick={() => setSelectedThemeNumber(current => current === theme.number ? null : theme.number)}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedThemeNumber(current => current === theme.number ? null : theme.number);
                  }
                }}
              >
                <div className="telegram-top"><span>{theme.number}</span><small>proposta · eixo</small><ArrowUpRight size={15} /></div>
                <h3>{theme.title}</h3>
                <p>{theme.body}</p>
                <button onClick={event => { event.stopPropagation(); document.getElementById("construcao")?.scrollIntoView({ behavior: "smooth" }); }}>
                  Contribuir com este tema <ArrowUpRight size={17} />
                </button>
              </article>
            ))}
            {selectedTheme && (
              <div className={`theme-detail-panel ${selectedTheme.color}`} role="dialog" aria-modal="true" aria-labelledby="theme-detail-title">
                <div className="theme-detail-heading">

                  <div>
                    <span className="theme-detail-kicker">Plano de ação · proposta {selectedTheme.number}</span>
                    <h3 id="theme-detail-title">{selectedTheme.title}</h3>
                  </div>
                  <button className="theme-detail-close" aria-label="Fechar detalhe da proposta" onClick={() => setSelectedThemeNumber(null)}>×</button>
                </div>
                <p className="theme-detail-intro">Um caminho de trabalho para transformar este eixo em compromisso acompanhado, com escuta, articulação e prestação de contas.</p>
                <ol>
                  {selectedTheme.plan.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}
                </ol>
                <button className="theme-detail-contribute" onClick={() => document.getElementById("construcao")?.scrollIntoView({ behavior: "smooth" })}>
                  Contribuir com este tema <ArrowUpRight size={17} />
                </button>
              </div>
            )}
          </div>
          <div className="project-principles">
            <span>Visão</span><strong>Representar o Rio Grande do Norte com presença e escuta.</strong>
            <span>Princípio</span><strong>Publicar compromissos claros, atualizados e abertos a participação.</strong>
          </div>
        </section>


        <section id="construcao" className="section collective-section identity-section">
          <div className="section-stamp" aria-hidden="true"><span>03</span></div>
          <div className="collective-copy">
            <SectionEyebrow>Construção coletiva</SectionEyebrow>
            <h2>Traga uma ideia do seu bairro. Vamos construir juntos.</h2>
            <p>Ideias, problemas e propostas ajudam a dar forma a um plano que começa nas pessoas. Nesta versão estática, o formulário confirma a sua participação localmente; conecte-o ao canal oficial para receber envios reais.</p>
            <div className="collective-markers"><span><HeartHandshake size={16} /> Escuta</span><span><MessageCircle size={16} /> Ideias</span><span><Flag size={16} /> Propostas</span></div>
          </div>
          <form className="idea-form" onSubmit={event => { event.preventDefault(); setIdeaSent(true); }}>
            <label>Seu nome<input required placeholder="Como podemos chamar você?" /></label>
            <label>Seu município<input required placeholder="Ex.: Mossoró" /></label>
            <label>Bairro <span className="optional">(opcional)</span><input placeholder="Onde esta ideia acontece?" /></label>
            <label>Tema<select required defaultValue=""><option value="" disabled>Escolha um tema</option><option>Orgulho de ser Potiguar</option><option>Segurança</option><option>Saúde</option><option>Desenvolvimento Sustentável</option><option>Outro</option></select></label>
            <label>Sua ideia, problema ou proposta<textarea required rows={4} maxLength={800} placeholder="Conte o que precisa entrar nessa conversa." /></label>
            <label>Seu e-mail ou WhatsApp <span className="optional">(opcional)</span><input type="text" placeholder="Como podemos responder?" /></label>
            <label className="consent-label"><input type="checkbox" required /> <span>Concordo com o uso destes dados apenas para responder a esta contribuição, conforme a política de privacidade.</span></label>
            <Button type="submit" className="send-button"><Send size={17} /> Enviar contribuição</Button>
            {ideaSent && <p className="form-confirm"><Check size={16} /> Contribuição recebida. Ela não representa promessa de adoção; ligue o formulário ao canal oficial para receber envios reais.</p>}
          </form>
        </section>

        <section id="desafio" className="section challenge-section identity-section">
          <div className="section-stamp rail-light" aria-hidden="true"><span>04</span></div>
          <div className="challenge-layout">
            <div className="challenge-copy">
              <SectionEyebrow>Desafio 167/180</SectionEyebrow>
              <h2>Teste o seu conhecimento. Você conhece todos os municípios do Rio Grande do Norte?</h2>
              <div className="challenge-rules"><span><Clock3 size={16} /> 3 minutos</span><span><MapPin size={16} /> 167 municípios</span><span><Sparkles size={16} /> mapa atualizado</span></div>
            </div>
            <div className="rn-map-card" aria-label="Mapa interativo do Rio Grande do Norte">
              <div className="rn-map-header"><div><span>Mapa do RN</span><strong>Municípios acertados</strong></div><b aria-live="polite">{highlightedCities.length}<small>/167</small></b></div>
              <div className="rn-map-frame">
                {mapError ? (
                  <p className="rn-map-status">Não foi possível carregar o mapa agora. O desafio continua disponível.</p>
                ) : rnShape.length ? (
                  <svg className="rn-map" viewBox="0 0 800 560" role="img" aria-label="Mapa branco do Rio Grande do Norte com municípios acertados destacados em azul">
                    <g className="rn-map-base">{rnShape.map((feature, index) => <path key={`rn-${index}`} d={geometryToPath(feature.geometry, mapProjection)} />)}</g>
                    <g className="rn-map-highlight">{highlightedShapes.map((feature, index) => <path key={`highlight-${index}`} d={geometryToPath(feature.geometry, mapProjection)} />)}</g>
                  </svg>
                ) : <p className="rn-map-status">A carregar o mapa do Rio Grande do Norte…</p>}
              </div>
              <p className="rn-map-note">Cada município que você acertar ficará marcado em azul.</p>
              {highlightedCities.length > 0 && <div className="rn-map-cities" aria-live="polite">{highlightedCities.slice(-6).map(city => <span key={city.id}>{city.nome}</span>)}</div>}
            </div>
            <div className="quiz-card">
              <div className="quiz-top"><span>Desafio em curso</span><strong>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}<small>min</small></strong></div>
              <div className="quiz-score"><span>Acertos</span><strong>{score}</strong><small>de 167</small></div>
              {!quizActive && !quizFinished && <Button onClick={startQuiz} disabled={!municipios.length} className="quiz-start">{municipios.length ? "Começar agora" : "A carregar municípios…"} <ArrowUpRight size={17} /></Button>}
              {quizActive && <form className="quiz-form" onSubmit={submitAnswer}>
                <input autoFocus value={answer} onChange={event => setAnswer(event.target.value)} placeholder="Digite um município" aria-label="Digite um município do RN" />
                <Button type="submit">Marcar <ChevronRight size={17} /></Button>
              </form>}
              {quizFinished && <div className="quiz-result"><p>Tempo encerrado. Você lembrou <strong>{score}</strong> município{score === 1 ? "" : "s"}.</p><Button onClick={startQuiz}>Tentar outra vez <ArrowUpRight size={16} /></Button></div>}
              {quizFeedback && <p className="quiz-feedback">{quizFeedback}</p>}
              {used.length > 0 && <div className="used-cities" aria-live="polite">{used.slice(0, 8).map(city => <span key={city}>{city}</span>)}</div>}
            </div>
          </div>
        </section>

        <section id="noticias" className="section news-section identity-section">
          <div className="section-stamp" aria-hidden="true"><span>05</span></div>
          <div className="news-header"><div><SectionEyebrow>Notícias</SectionEyebrow><h2>Informação com data, fonte e caminho para acompanhar.</h2></div><a href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer" className="text-link">Ver canal oficial <ExternalLink size={15} /></a></div>
          <div className="news-grid">
            {news.map((item, index) => <a className="news-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}><span>despacho 0{index + 1} · {item.tag}</span><h3>{item.title}</h3><p>{item.body}</p><ArrowUpRight size={18} /></a>)}
          </div>
        </section>

        <section id="galeria" className="gallery-section identity-section">
          <div className="gallery-title"><SectionEyebrow>Galeria</SectionEyebrow><h2>Orgulho de ser norte-rio-grandense.</h2><p>Registos de encontros, agendas e momentos de diálogo com quem constrói o Rio Grande do Norte todos os dias.</p></div>
          <div className="gallery-grid">
            {galleryImages.map(image => (
              <figure key={image.src} className={image.wide ? "gallery-wide" : undefined}>
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="participe" className="participate-section">
          <div><SectionEyebrow>Participe</SectionEyebrow><h2>Faz sentido?! Então faça parte.</h2></div>
          <div className="participate-actions"><a href="#construcao" className="button-primary">Enviar uma ideia <ArrowUpRight size={18} /></a><a href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer" className="button-outline"><Instagram size={18} /> Seguir no Instagram</a></div>
        </section>
      </main>

      <footer id="contato" className="site-footer">
        <div className="footer-brand"><div><strong><SusapeWordmark className="susape-wordmark-footer" /> 1234</strong><span>Deputado Federal · RN</span></div></div>
        <div className="footer-links"><a href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a><a href="https://www.facebook.com/susape.augusto/" target="_blank" rel="noreferrer"><Facebook size={17} /> Facebook</a><span><MessageCircle size={17} /> WhatsApp: canal a confirmar</span></div>
        <div className="footer-note"><p>Conteúdo baseado em fontes públicas consultadas em agosto de 2026. Situação de candidatura pode mudar; confirme no TSE.</p><a href="https://divulgacandcontas.tse.jus.br/" target="_blank" rel="noreferrer">Consulta oficial <ExternalLink size={14} /></a></div>
      </footer>
    </div>
  );
}
