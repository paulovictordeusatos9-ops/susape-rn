/**
 * Atualização baseada no Manual de Identidade Visual SUSAPE 1234.
 * Cada bloco deve levar a uma ação concreta e nunca substituir factos verificados por ficção.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  ExternalLink,
  Facebook,
  Flag,
  HeartHandshake,
  Instagram,
  Landmark,
  MapPin,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  Sun,
  ShieldCheck,
  HeartPulse,
  Wind,
  Users,
  X,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type Municipio = {
  id: number;
  nome: string;
  "regiao-imediata"?: {
    "regiao-intermediaria"?: { nome?: string };
  };
};

const IBGE_MUNICIPIOS_URL =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados/24/municipios";

const heroImage = "/manus-storage/susape-manual-candidato-portrait_07f389a4.jpg";
const encounterImage = "/manus-storage/susape-territorio-encontro_bddc5ac6.jpg";
const bridgeImage = "/manus-storage/susape-costa-ponte_c56e432f.jpg";
const logoImage = "/manus-storage/page-003_8955e366.png";
const wikimediaBridge = "/manus-storage/ponte-newton-navarro-ccby_2f5f8d70.jpg";

const chartConfig = {
  municipios: { label: "Municípios", color: "#e0141e" },
} satisfies ChartConfig;

const themes = [
  {
    number: "01",
    title: "Orgulho de ser Potiguar",
    body: "Valorizar a identidade, a cultura, a história, as potencialidades e o sentimento de pertencimento ao Rio Grande do Norte.",
    color: "theme-orgulho",
    icon: Sun,
  },
  {
    number: "02",
    title: "Segurança Pública para Todos",
    body: "Defender proteção, integração, prevenção, tecnologia e cidadania, com presença do Estado e segurança para as famílias.",
    color: "theme-seguranca",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Saúde mais perto de quem precisa",
    body: "Propor atenção à infraestrutura, urgência, atenção básica e fortalecimento da rede regional dos municípios.",
    color: "theme-saude",
    icon: HeartPulse,
  },
  {
    number: "04",
    title: "Desenvolvimento Sustentável",
    body: "Aproveitar as riquezas naturais, culturais e económicas do RN com responsabilidade, oportunidades e preservação.",
    color: "theme-sustentavel",
    icon: Wind,
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

const activityEntries = [
  { category: "Projetos", title: "[CONTEÚDO A SER FORNECIDO PELA CAMPANHA]", body: "Espaço para projetos documentados, com data e fonte.", icon: Landmark },
  { category: "Ações", title: "[CONTEÚDO A SER FORNECIDO PELA CAMPANHA]", body: "Espaço para ações e iniciativas públicas da candidatura.", icon: Users },
  { category: "Iniciativas", title: "[CONTEÚDO A SER FORNECIDO PELA CAMPANHA]", body: "Espaço para articulações e experiências verificáveis.", icon: Flag },
  { category: "Agenda", title: "[CONTEÚDO A SER FORNECIDO PELA CAMPANHA]", body: "Espaço para agendas, encontros e visitas oficiais.", icon: Clock3 },
  { category: "Resultados", title: "[CONTEÚDO A SER FORNECIDO PELA CAMPANHA]", body: "Espaço para resultados publicados com contexto e fonte.", icon: Check },
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipiosError, setMunicipiosError] = useState(false);
  const [ideaSent, setIdeaSent] = useState(false);
  const [activityFilter, setActivityFilter] = useState("Todos");
  const [quizActive, setQuizActive] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [used, setUsed] = useState<string[]>([]);
  const [quizFeedback, setQuizFeedback] = useState("");

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
      .catch(() => active && setMunicipiosError(true));
    return () => {
      active = false;
    };
  }, []);

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

  const regionData = useMemo(() => {
    const grouped = municipios.reduce<Record<string, number>>((acc, municipio) => {
      const region = municipio["regiao-imediata"]?.["regiao-intermediaria"]?.nome || "Outra região";
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(grouped)
      .map(([regiao, total]) => ({ regiao, municipios: total }))
      .sort((a, b) => b.municipios - a.municipios);
  }, [municipios]);

  const startQuiz = () => {
    setTimeLeft(60);
    setScore(0);
    setAnswer("");
    setUsed([]);
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
    setScore(previous => previous + 1);
    setAnswer("");
    setQuizFeedback(`Resposta validada: ${city.nome}.`);
  };

  const nav = [
    ["Trajetória", "#quem-e"],
    ["Projeto", "#projeto"],
    ["Propostas", "#propostas"],
    ["Desafio", "#desafio"],
    ["Participe", "#participe"],
  ];

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Susape 1234 — início">
          <div className="brand-lockup">
            <span>DEPUTADO FEDERAL</span>
            <strong>SUSAPE</strong>
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
        <a className="header-cta" href="#construcao">
          Construir junto <ArrowUpRight size={16} />
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
        <section id="inicio" className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hero-overlay" />
          <div className="manual-icons" aria-label="Ícones de referência do Rio Grande do Norte">
            <span><b>≈</b> ondas</span><span><b>✹</b> sol</span><span><b>⌁</b> farol</span><span><b>●</b> gente</span>
          </div>
          <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-lockup" aria-label="Deputado Federal Susape 1234"><span>DEPUTADO FEDERAL</span><strong>SUSAPE <b className="num-red">1</b><b className="num-green">2</b><b className="num-blue">3</b><b className="num-yellow">4</b></strong></div>
              <SectionEyebrow>Um jeito potiguar de fazer</SectionEyebrow>
              <h1>ORGULHO DE SER NORTE-RIO-GRANDENSE.</h1>
            <p className="hero-summary">
              Uma candidatura federal que apresenta o RN com identidade, escuta e compromisso com inclusão, cultura, educação e saúde.
            </p>
              <div className="hero-actions">
                <a className="button-primary" href="#quem-e">
                  Conheça a trajetória <ArrowDownRight size={19} />
                </a>
                <a className="button-ghost" href="#construcao">
                  Traga uma ideia <ChevronRight size={18} />
                </a>
              </div>
              <p className="hero-source">PDT · 1234 · dados públicos da candidatura em atualização</p>
            </div>
            <aside className="hero-card" aria-label="Resumo da candidatura">
              <span className="card-label">Faz sentido?!</span>
              <strong><b className="num-red">1</b><b className="num-green">2</b><b className="num-blue">3</b><b className="num-yellow">4</b></strong>
              <p>um jeito potiguar de fazer.</p>
              <div className="hero-card-footer">
                <Compass size={18} />
                <span>Orgulho potiguar</span>
              </div>
            </aside>
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
            <div className="profile-facts">
              {perfil.map(([eyebrow, title, body], index) => (
                <article className="profile-fact" key={title}>
                  <span className="timeline-index">0{index + 1}</span>
                  <div>
                    <small>{eyebrow}</small>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
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
              <article className={`theme-card ${theme.color}`} key={theme.number}>
                <div className="telegram-top"><span>{theme.number}</span><small>proposta · eixo</small><ArrowUpRight size={15} /></div>
                <h3>{theme.title}</h3>
                <p>{theme.body}</p>
                <div className="theme-icon" aria-hidden="true"><theme.icon size={24} /></div>
                <button onClick={() => document.getElementById("construcao")?.scrollIntoView({ behavior: "smooth" })}>
                  Contribuir com este tema <ArrowUpRight size={17} />
                </button>
              </article>
            ))}
          </div>
          <div className="project-principles">
            <span>Visão</span><strong>Representar o Rio Grande do Norte com presença e escuta.</strong>
            <span>Princípio</span><strong>Publicar compromissos claros, atualizados e abertos a participação.</strong>
          </div>
        </section>

        <section id="atuacao" className="section action-section identity-section">
          <div className="section-stamp" aria-hidden="true"><span>03</span></div>
          <div className="action-layout">
            <div className="action-photo-wrap">
              <img src={encounterImage} alt="Pessoas reunidas em torno de um mapa, imagem ilustrativa de construção coletiva" />
              <span className="photo-chip"><MapPin size={14} /> Escuta no território · RN</span>
            </div>
            <div className="action-copy">
              <SectionEyebrow>Atuação</SectionEyebrow>
              <h2>Agenda, encontros e resultados: presença que se comprova.</h2>
              <p>Área editorial com filtros para projetos, ações, iniciativas, agenda e resultados. Até que a campanha forneça os registos oficiais, os cartões permanecem identificados como conteúdo pendente.</p>
              <div className="activity-filters" role="tablist" aria-label="Filtrar atuação">
                {["Todos", "Projetos", "Ações", "Iniciativas", "Agenda", "Resultados"].map(filter => <button key={filter} type="button" className={activityFilter === filter ? "active" : ""} onClick={() => setActivityFilter(filter)}>{filter}</button>)}
              </div>
              <div className="action-list">
                {activityEntries.filter(item => activityFilter === "Todos" || item.category === activityFilter).map(item => { const Icon = item.icon; return <div key={item.category}><Icon size={19} /><span><strong>{item.category}</strong><small>{item.title} · {item.body}</small></span></div>; })}
              </div>
              <a className="text-link" href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer">Acompanhar registos no Instagram <ExternalLink size={15} /></a>
            </div>
          </div>
        </section>

        <section id="territorio" className="section data-section identity-section">
          <div className="section-stamp rail-light" aria-hidden="true"><span>04</span></div>
          <div className="data-copy">
            <SectionEyebrow>O estado em números</SectionEyebrow>
            <h2>167 municípios. Um estado inteiro para conhecer.</h2>
            <p>O painel usa a lista oficial de municípios do IBGE e permite ver como eles se distribuem pelas regiões intermediárias. É uma leitura territorial, não um indicador de desempenho de campanha.</p>
          </div>
          <div className="data-card">
            <div className="data-card-header">
              <div><span className="card-label">Distribuição territorial</span><h3>Municípios por região intermediária</h3><span className="map-reference">base oficial · RN</span></div>
              <div className="big-number">{municipios.length || "—"}<small>municípios</small></div>
            </div>
            {municipiosError ? (
              <div className="chart-empty">Não foi possível carregar a lista do IBGE agora. Tente atualizar a página.</div>
            ) : (
              <ChartContainer config={chartConfig} className="territory-chart">
                <BarChart data={regionData} layout="vertical" margin={{ left: 12, right: 20, top: 8, bottom: 8 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="regiao" type="category" axisLine={false} tickLine={false} width={78} tick={{ fontSize: 12, fill: "#E8E2D6" }} />
                  <ChartTooltip cursor={{ fill: "rgba(255,255,255,0.06)" }} content={<ChartTooltipContent />} />
                  <Bar dataKey="municipios" radius={[0, 10, 10, 0]}>
                    {regionData.map((entry, index) => <Cell key={entry.regiao} fill={index === 0 ? "#F15A3A" : index === 1 ? "#DDAA50" : "#6C997C"} />)}
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
            <p className="data-source">Fonte: <a href="https://servicodados.ibge.gov.br/api/v1/localidades/estados/24/municipios" target="_blank" rel="noreferrer">API de Localidades do IBGE</a>.</p>
          </div>
        </section>

        <section id="construcao" className="section collective-section identity-section">
          <div className="section-stamp" aria-hidden="true"><span>05</span></div>
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
          <div className="section-stamp rail-light" aria-hidden="true"><span>06</span></div>
          <div className="challenge-copy">
            <SectionEyebrow>Desafio 167/60</SectionEyebrow>
            <h2>Faz sentido?! Em 60 segundos, quantos municípios você lembra?</h2>
            <p>Digite os nomes sem consultar lista. O desafio confere cada resposta pela base oficial do IBGE e contabiliza apenas respostas únicas.</p>
            <div className="challenge-rules"><span><Clock3 size={16} /> 60 segundos</span><span><MapPin size={16} /> 167 municípios</span><span><Sparkles size={16} /> resposta imediata</span></div>
          </div>
          <div className="quiz-card">
            <div className="quiz-top"><span>Desafio em curso</span><strong>{String(timeLeft).padStart(2, "0")}<small>s</small></strong></div>
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
        </section>

        <section id="noticias" className="section news-section identity-section">
          <div className="section-stamp" aria-hidden="true"><span>07</span></div>
          <div className="news-header"><div><SectionEyebrow>Notícias</SectionEyebrow><h2>Informação com data, fonte e caminho para acompanhar.</h2></div><a href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer" className="text-link">Ver canal oficial <ExternalLink size={15} /></a></div>
          <div className="news-grid">
            {news.map((item, index) => <a className="news-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}><span>despacho 0{index + 1} · {item.tag}</span><h3>{item.title}</h3><p>{item.body}</p><ArrowUpRight size={18} /></a>)}
          </div>
        </section>

        <section id="galeria" className="gallery-section identity-section">
          <div className="gallery-title"><SectionEyebrow>Galeria</SectionEyebrow><h2>Orgulho de ser norte-rio-grandense.</h2><p>Galeria-base com imagens de apoio do RN e referências do manual. Substitua ou complemente com fotos oficiais de agendas, visitas e encontros.</p></div>
          <div className="gallery-grid">
            <figure className="gallery-main"><img src={bridgeImage} alt="Ponte sobre a água em Natal, imagem ilustrativa" /><figcaption>Conexão · imagem ilustrativa</figcaption></figure>
            <figure><img src={wikimediaBridge} alt="Ponte Newton Navarro em Natal" /><figcaption>Ponte Newton Navarro · Foto: Otávio Nogueira, CC BY 2.0</figcaption></figure>
            <figure><img src={encounterImage} alt="Grupo reunido em torno de um mapa, imagem ilustrativa" /><figcaption>Construção coletiva · imagem ilustrativa</figcaption></figure>
          </div>
        </section>

        <section id="participe" className="participate-section">
          <div><SectionEyebrow>Participe</SectionEyebrow><h2>Faz sentido?! Então faça parte.</h2></div>
          <div className="participate-actions"><a href="#construcao" className="button-primary">Enviar uma ideia <ArrowUpRight size={18} /></a><a href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer" className="button-outline"><Instagram size={18} /> Seguir no Instagram</a></div>
        </section>
      </main>

      <footer id="contato" className="site-footer">
        <div className="footer-brand"><img src={logoImage} alt="" /><div><strong>Susape 1234</strong><span>Deputado Federal · RN</span></div></div>
        <div className="footer-links"><a href="https://www.instagram.com/susapeaugusto/" target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a><a href="https://www.facebook.com/susape.augusto/" target="_blank" rel="noreferrer"><Facebook size={17} /> Facebook</a><span><MessageCircle size={17} /> WhatsApp: canal a confirmar</span></div>
        <div className="footer-note"><p>Conteúdo baseado em fontes públicas consultadas em agosto de 2026. Situação de candidatura pode mudar; confirme no TSE.</p><a href="https://divulgacandcontas.tse.jus.br/" target="_blank" rel="noreferrer">Consulta oficial <ExternalLink size={14} /></a></div>
      </footer>
    </div>
  );
}
